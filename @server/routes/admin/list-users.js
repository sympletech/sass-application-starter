import { db } from '@server/lib/mongo-client.js';
import deriveSubscriptionStatus from '@server/lib/derive-subscription-status.js';

export default async ({ page = '1', limit = '20', search = '' }) => {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    const searchQuery = search.trim() 
        ? {
            $or: [
                { email: { $regex: search, $options: 'i' } },
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } }
            ]
        }
        : {};

    // Get total count
    const total = await db.collections.accounts.countDocuments(searchQuery);

    // Get users
    const users = await db.collections.accounts
        .find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray();

    // Enrich users with subscription data
    const enrichedUsers = await Promise.all(
        users.map(async (user) => {
            const { plan, subscriptionStatus, cancelAtPeriodEnd } = 
                await deriveSubscriptionStatus(user.subscriptionId);

            return {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                inactive: !!user.inactive,
                isAdmin: !!user.isAdmin,
                isSocial: !!user.isSocial,
                oauthProvider: user.oauthProvider || null,
                subscriptionId: user.subscriptionId || null,
                stripeCustomerId: user.stripeCustomerId || null,
                plan,
                subscriptionStatus,
                cancelAtPeriodEnd,
                createdAt: user.createdAt
            };
        })
    );

    return {
        users: enrichedUsers,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum)
        }
    };
};
