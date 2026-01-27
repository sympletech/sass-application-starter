import stripeClient from '@server/lib/stripe-client.js';

export default async (subscriptionId) => {
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