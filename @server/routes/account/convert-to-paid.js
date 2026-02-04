import stripeClient from '@server/lib/stripe-client.js';
import deriveSubscriptionStatus from '@server/lib/derive-subscription-status.js';

export default async (_params, { user }) => {
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
    return {
        success: true,
        subscription: updatedSubscription
    };
};