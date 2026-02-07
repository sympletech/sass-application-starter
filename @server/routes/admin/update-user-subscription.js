import { ObjectId } from 'mongodb';
import { db } from '@server/lib/mongo-client.js';
import stripeClient from '@server/lib/stripe-client.js';

export default async ({ userId, action }) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    if (!action || !['convert-to-paid', 'cancel-subscription', 'reactivate-subscription'].includes(action)) {
        throw new Error('Valid action is required: convert-to-paid, cancel-subscription, or reactivate-subscription');
    }

    let objectId;
    try {
        objectId = new ObjectId(userId);
    } catch {
        throw new Error('Invalid User ID');
    }

    // Check if user exists
    const user = await db.collections.accounts.findOne({ _id: objectId });
    if (!user) {
        throw new Error('User not found');
    }

    if (!user.subscriptionId) {
        throw new Error('User does not have a subscription');
    }

    let message = '';
    let subscription;

    try {
        subscription = await stripeClient.subscriptions.retrieve(user.subscriptionId);

        switch (action) {
            case 'convert-to-paid':
                if (subscription.status !== 'trialing') {
                    throw new Error('Subscription is not in trial state');
                }
                await stripeClient.subscriptions.update(user.subscriptionId, {
                    trial_end: 'now',
                    cancel_at_period_end: false
                });
                message = 'User subscription converted to paid';
                break;

            case 'cancel-subscription':
                if (subscription.status === 'canceled') {
                    throw new Error('Subscription is already canceled');
                }
                await stripeClient.subscriptions.update(user.subscriptionId, {
                    cancel_at_period_end: true
                });
                message = 'User subscription will be canceled at period end';
                break;

            case 'reactivate-subscription':
                if (!subscription.cancel_at_period_end) {
                    throw new Error('Subscription is not set to cancel');
                }
                await stripeClient.subscriptions.update(user.subscriptionId, {
                    cancel_at_period_end: false
                });
                message = 'User subscription has been reactivated';
                break;

            default:
                throw new Error('Unknown action');
        }
    } catch (error) {
        console.error('Stripe error:', error);
        throw new Error(error.message || 'Failed to update subscription');
    }

    return {
        success: true,
        message,
        userId,
        action
    };
};
