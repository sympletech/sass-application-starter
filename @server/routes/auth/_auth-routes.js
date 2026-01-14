import express from 'express';
import stripe from 'stripe';
import bcrypt from 'bcryptjs';
import { db } from '@server/lib/mongo-client.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

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
    post('/auth/signup', async ({ email, password, paymentMethodId, isSocial }) => {
        if (!email || (!isSocial && !password) || !paymentMethodId) {
            throw new Error('Email, password, and payment method are required');
        }

        // Check if user exists
        let user = await db.collections.accounts.findOne({ email });

        if (user && user.subscriptionId) {
            throw new Error('User already exists and has an active subscription');
        }

        // Create Stripe Customer if not exists
        let customerId = user?.stripeCustomerId;
        if (!customerId) {
            const customer = await stripeClient.customers.create({
                email,
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
            customerId = customer.id;
        } else {
            // Update existing customer with new payment method
            await stripeClient.paymentMethods.attach(paymentMethodId, {
                customer: customerId,
            });
            await stripeClient.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
        }

        // Create Subscription with Free Trial
        const subscription = await stripeClient.subscriptions.create({
            customer: customerId,
            items: [{ price: process.env.STRIPE_TRIAL_PRICE_ID }],
            trial_period_days: 14,
        });

        if (user) {
            // Update user with subscription and customer ID
            await db.collections.accounts.updateOne(
                { _id: user._id },
                {
                    $set: {
                        stripeCustomerId: customerId,
                        subscriptionId: subscription.id,
                        updatedAt: new Date(),
                        isSocial: isSocial || user.isSocial
                    }
                }
            );
        } else {
            // Create New User
            let userDoc = {
                email,
                stripeCustomerId: customerId,
                subscriptionId: subscription.id,
                isSocial: !!isSocial,
                createdAt: new Date()
            };

            if (!isSocial && password) {
                const salt = process.env.PASSWORD_SALT || 'default_salt';
                const hashedPassword = await bcrypt.hash(password + salt, 10);
                userDoc.password = hashedPassword;
            }

            await db.collections.accounts.insertOne(userDoc);
        }

        return { success: true, message: 'Signup successful! Your free trial has started.' };
    });

    // Traditional Login Route
    post('/auth/login', async ({ email, password }) => {
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

        const salt = process.env.PASSWORD_SALT || 'default_salt';
        const isMatch = await bcrypt.compare(password + salt, user.password);

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Handle session/JWT here if needed. 
        // For now just return success.
        return { success: true, message: 'Login successful' };
    });
};
