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
    post('/auth/signup', async ({ email, password, paymentMethodId, isSocial, firstName, lastName }) => {
        if (!email || (!isSocial && !password) || !paymentMethodId) {
            throw new Error('Email, password, and payment method are required');
        }

        // Check if user exists
        let user = await db.collections.accounts.findOne({ email });

        if (user && user.subscriptionId) {
            throw new Error('User already exists and has an active subscription');
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
                isSocial: isSocial || user.isSocial
            };
            
            // Update firstName and lastName if provided
            if (firstName) updateData.firstName = firstName;
            if (lastName) updateData.lastName = lastName;

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
                createdAt: new Date()
            };

            // Add firstName and lastName if provided
            if (firstName) userDoc.firstName = firstName;
            if (lastName) userDoc.lastName = lastName;

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
