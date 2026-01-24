import express from 'express';
import stripe from 'stripe';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { db } from '@server/lib/mongo-client.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const clientBase = process.env.VITE_MODE === 'development'
    ? `http://localhost:${process.env.VITE_CLIENT_PORT}`
    : '/';
const loggedInRedirect = `${clientBase}/@`;

const reactivateRedirect = (email) => `${clientBase}/reactivate?email=${encodeURIComponent(email)}`;

const deriveSubscriptionStatus = async (subscriptionId) => {
    if (!subscriptionId) {
        return { plan: 'trial', subscriptionStatus: 'none', cancelAtPeriodEnd: false };
    }

    try {
        const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
        const status = subscription.status;
        const inTrial = status === 'trialing' ||
            (subscription.trial_end && (subscription.trial_end * 1000) > Date.now());

        return {
            plan: inTrial ? 'trial' : 'paid',
            subscriptionStatus: status,
            cancelAtPeriodEnd: !!subscription.cancel_at_period_end
        };
    } catch (error) {
        console.error('Failed to retrieve Stripe subscription', error);
        return { plan: 'trial', subscriptionStatus: 'error', cancelAtPeriodEnd: false };
    }
};

const requireAuth = async (req, { allowInactive = false } = {}) => {
    const userId = req.session?.userId;
    if (!userId) {
        const err = new Error('Not authenticated');
        err.status = 401;
        err.redirect = '/login';
        throw err;
    }

    let objectId;
    try {
        objectId = new ObjectId(userId);
    } catch {
        const err = new Error('Invalid session');
        err.status = 401;
        err.redirect = '/login';
        throw err;
    }

    const user = await db.collections.accounts.findOne({ _id: objectId });
    if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        err.redirect = '/login';
        throw err;
    }

    if (user.inactive && !allowInactive) {
        const err = new Error('Account inactive');
        err.status = 403;
        err.redirect = reactivateRedirect(user.email);
        throw err;
    }

    return user;
};

export default ({ app, get, post }) => {
    app.use(express.json());
    // Get Stripe Publishable Key
    get('/auth/stripe-config', () => {
        return {
            publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY
        };
    });

    // Create a SetupIntent for the signup form
    post('/auth/create-setup-intent', async () => {
        const setupIntent = await stripeClient.setupIntents.create({
            payment_method_types: ['card'],
        });
        return { clientSecret: setupIntent.client_secret };
    });

    // Final Signup Route
    post('/auth/signup', async ({ email, password, paymentMethodId, isSocial, oauthProvider, firstName, lastName }, req) => {
        if (!email || (!isSocial && !password) || !paymentMethodId) {
            throw new Error('Email, password, and payment method are required');
        }

        // Check if user exists
        let user = await db.collections.accounts.findOne({ email });

        if (user?.inactive) {
            const err = new Error('Account is inactive. Please reactivate to continue.');
            err.status = 403;
            err.redirect = reactivateRedirect(email);
            throw err;
        }

        const existingProvider = user?.oauthProvider || (user?.isSocial ? 'social' : 'password');
        const incomingProvider = isSocial ? (oauthProvider || 'social') : 'password';

        if (user && existingProvider !== incomingProvider) {
            const providerHint = existingProvider === 'password' ? 'email/password' : existingProvider;
            const err = new Error(`Use your ${providerHint} account to sign in.`);
            err.status = 400;
            err.redirect = `${clientBase}/login`;
            throw err;
        }

        if (user && user.subscriptionId) {
            const err = new Error('User already exists. Please log in.');
            err.status = 400;
            err.redirect = `${clientBase}/login`;
            throw err;
        }

        // Prepare customer data for Stripe
        const customerData = {
            email,
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        };

        // Add name to Stripe customer if provided
        if (firstName || lastName) {
            customerData.name = [firstName, lastName].filter(Boolean).join(' ');
        }

        // Create Stripe Customer if not exists
        let customerId = user?.stripeCustomerId;
        if (!customerId) {
            const customer = await stripeClient.customers.create(customerData);
            customerId = customer.id;
        } else {
            // Update existing customer with new payment method
            await stripeClient.paymentMethods.attach(paymentMethodId, {
                customer: customerId,
            });
            const updateData = {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            };
            if (firstName || lastName) {
                updateData.name = [firstName, lastName].filter(Boolean).join(' ');
            }
            await stripeClient.customers.update(customerId, updateData);
        }

        // Create Subscription with Free Trial
        const subscription = await stripeClient.subscriptions.create({
            customer: customerId,
            items: [{ price: process.env.STRIPE_TRIAL_PRICE_ID }],
            trial_period_days: 14,
        });

        if (user) {
            // Update user with subscription and customer ID
            const updateData = {
                stripeCustomerId: customerId,
                subscriptionId: subscription.id,
                updatedAt: new Date(),
                isSocial: isSocial || user.isSocial,
                inactive: false
            };

            // Update firstName and lastName if provided
            if (firstName) updateData.firstName = firstName;
            if (lastName) updateData.lastName = lastName;
            if (oauthProvider) updateData.oauthProvider = oauthProvider;

            await db.collections.accounts.updateOne(
                { _id: user._id },
                { $set: updateData }
            );
        } else {
            // Create New User
            let userDoc = {
                email,
                stripeCustomerId: customerId,
                subscriptionId: subscription.id,
                isSocial: !!isSocial,
                inactive: false,
                createdAt: new Date()
            };

            // Add firstName and lastName if provided
            if (firstName) userDoc.firstName = firstName;
            if (lastName) userDoc.lastName = lastName;
            if (oauthProvider) userDoc.oauthProvider = oauthProvider;

            if (!isSocial && password) {
                const salt = process.env.PASSWORD_SALT || 'default_salt';
                const hashedPassword = await bcrypt.hash(password + salt, 10);
                userDoc.password = hashedPassword;
            }

            const insertResult = await db.collections.accounts.insertOne(userDoc);
            user = { ...userDoc, _id: insertResult.insertedId };
        }

        req.session.userId = (user._id || user.insertedId || user.id)?.toString?.() || null;
        req.session.email = user.email;

        return {
            success: true,
            message: 'Signup successful! Your free trial has started.',
            redirect: loggedInRedirect
        };
    });

    // Traditional Login Route
    post('/auth/login', async ({ email, password }, req) => {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await db.collections.accounts.findOne({ email });

        // If user doesn't exist, the client should redirect to signup
        if (!user) {
            return {
                success: false,
                redirect: '/signup',
                message: 'No account found. Please sign up for a free trial!'
            };
        }

        if (user.isSocial) {
            const providerHint = user.oauthProvider === 'google' || user.oauthProvider === 'facebook'
                ? `Use your ${user.oauthProvider.charAt(0).toUpperCase()}${user.oauthProvider.slice(1)} account`
                : 'Use your social login';
            const err = new Error(providerHint);
            err.status = 400;
            err.redirect = `${clientBase}/login`;
            throw err;
        }

        if (user.inactive) {
            const err = new Error('Account inactive. Please reactivate.');
            err.status = 403;
            err.redirect = reactivateRedirect(email);
            throw err;
        }

        const salt = process.env.PASSWORD_SALT || 'default_salt';
        const isMatch = await bcrypt.compare(password + salt, user.password || '');

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        req.session.userId = user._id.toString();
        req.session.email = user.email;

        return { success: true, message: 'Login successful', redirect: loggedInRedirect };
    });

    get('/auth/me', async (_params, req) => {
        const user = await requireAuth(req);
        const { plan, subscriptionStatus, cancelAtPeriodEnd } = await deriveSubscriptionStatus(user.subscriptionId);

        return {
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            inactive: !!user.inactive,
            isSocial: !!user.isSocial,
            oauthProvider: user.oauthProvider || null,
            plan,
            subscriptionStatus,
            cancelAtPeriodEnd
        };
    });

    post('/billing/convert-to-paid', async (_params, req) => {
        const user = await requireAuth(req);

        if (user.inactive) {
            throw new Error('Inactive accounts cannot convert to paid');
        }
        if (!user.subscriptionId) {
            throw new Error('No subscription found for this account');
        }

        const subscription = await stripeClient.subscriptions.retrieve(user.subscriptionId);
        if (subscription.status !== 'trialing') {
            throw new Error('Subscription is not in a trial state');
        }

        await stripeClient.subscriptions.update(user.subscriptionId, {
            trial_end: 'now',
            cancel_at_period_end: false
        });

        const updatedSubscription = await deriveSubscriptionStatus(user.subscriptionId);
        return { success: true, subscription: updatedSubscription };
    });

    post('/billing/create-portal-session', async (_params, req) => {
        const user = await requireAuth(req);
        if (!user.stripeCustomerId) {
            throw new Error('No billing account found');
        }

        const session = await stripeClient.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${clientBase}/profile`,
        });

        return { url: session.url };
    });

    post('/account/cancel', async (_params, req) => {
        const user = await requireAuth(req);

        if (!user.subscriptionId) {
            throw new Error('No subscription found for this account');
        }

        await stripeClient.subscriptions.update(user.subscriptionId, {
            cancel_at_period_end: true
        });

        await db.collections.accounts.updateOne(
            { email: user.email },
            { $set: { inactive: true, updatedAt: new Date() } }
        );

        const subscription = await deriveSubscriptionStatus(user.subscriptionId);
        return { success: true, inactive: true, subscription };
    });

    post('/account/reactivate', async ({ email: reactivateEmail }, req) => {
        let user;
        if (req.session?.userId) {
            user = await requireAuth(req, { allowInactive: true });
        } else if (reactivateEmail) {
            user = await db.collections.accounts.findOne({ email: reactivateEmail });
            if (!user) {
                const err = new Error('Account not found');
                err.status = 404;
                throw err;
            }
        } else {
            const err = new Error('Email is required to reactivate');
            err.status = 400;
            throw err;
        }

        if (!user.inactive) {
            return { success: true, inactive: false };
        }

        if (!user.stripeCustomerId) {
            throw new Error('Stripe customer is missing for this account');
        }

        let subscriptionId = user.subscriptionId;
        let subscription;

        if (subscriptionId) {
            try {
                subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
            } catch (error) {
                console.error(error);
                subscription = null;
            }
        }

        if (!subscription || subscription.status === 'canceled') {
            const newSubscription = await stripeClient.subscriptions.create({
                customer: user.stripeCustomerId,
                items: [{ price: process.env.STRIPE_TRIAL_PRICE_ID }]
            });
            subscriptionId = newSubscription.id;
            subscription = newSubscription;
        } else if (subscription.cancel_at_period_end) {
            subscription = await stripeClient.subscriptions.update(subscriptionId, {
                cancel_at_period_end: false
            });
        }

        await db.collections.accounts.updateOne(
            { email: user.email },
            { $set: { inactive: false, subscriptionId, updatedAt: new Date() } }
        );

        req.session.userId = user._id?.toString?.() || req.session.userId;
        req.session.email = user.email;

        const derived = await deriveSubscriptionStatus(subscriptionId);
        return { success: true, inactive: false, subscription: derived };
    });
};
