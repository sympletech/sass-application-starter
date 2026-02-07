import deriveSubscriptionStatus from '@server/lib/derive-subscription-status.js';

export default async (_params, { user }) => {
    const { plan, subscriptionStatus, cancelAtPeriodEnd } = await deriveSubscriptionStatus(user.subscriptionId);

    return {
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        inactive: !!user.inactive,
        isAdmin: !!user.isAdmin,
        isSocial: !!user.isSocial,
        oauthProvider: user.oauthProvider || null,
        plan,
        subscriptionStatus,
        cancelAtPeriodEnd
    };
}