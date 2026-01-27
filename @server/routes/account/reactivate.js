import { db } from '@server/lib/mongo-client.js';
import stripeClient from '@server/lib/stripe-client.js';
import deriveSubscriptionStatus from '@server/lib/derive-subscription-status.js';

export default async ({ email: reactivateEmail }, req) => {
    const user = await db.collections.accounts.findOne({ email: reactivateEmail });
    if (!user) {
        const err = new Error('Account not found');
        err.status = 404;
        throw err;
    }

    if (!user.inactive) {
        return {
            success: true,
            inactive: false
        };
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
    return {
        success: true,
        inactive: false,
        subscription: derived
    };
}