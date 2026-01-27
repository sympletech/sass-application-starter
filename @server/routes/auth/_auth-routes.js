import bcrypt from 'bcryptjs';
import { db } from '@server/lib/mongo-client.js';
import stripeClient from '@server/lib/stripe-client.js';

import stripeCreateSetupIntent from './stripe-create-setup-intent.js';
import signup from './signup.js';

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

export default ({ get, post, securedGet, securedPost }) => {
    // Get Stripe Publishable Key
    get('/auth/stripe-config', () => ({ publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY }));

    // Create a SetupIntent for the signup form
    post('/auth/stripe-create-setup-intent', stripeCreateSetupIntent);

    // Final Signup Route
    post('/auth/signup', signup);

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
