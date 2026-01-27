import bcrypt from 'bcryptjs';
import { db } from '@server/lib/mongo-client.js';
import stripeClient from '@server/lib/stripe-client.js';
import { clientBase, reactivateRedirect, loggedInRedirect } from '@server/lib/client-path-helpers.js';

export default async ({
    email,
    password,
    paymentMethodId,
    isSocial,
    oauthProvider,
    firstName,
    lastName
}, { req }) => {
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
}