import stripeClient from '@server/lib/stripe-client.js';
import { db } from '@server/lib/mongo-client.js';
import deriveSubscriptionStatus from '@server/lib/derive-subscription-status.js';

export default async (_params, { user }) => {
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
    return {
        success: true,
        inactive: true,
        subscription
    };
}