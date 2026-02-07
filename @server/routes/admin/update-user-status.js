import { ObjectId } from 'mongodb';
import { db } from '@server/lib/mongo-client.js';

export default async ({ userId, inactive }) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    if (typeof inactive !== 'boolean') {
        throw new Error('Inactive status must be a boolean value');
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

    // Prevent deactivating admin users
    if (inactive && user.isAdmin) {
        throw new Error('Cannot inactivate admin users');
    }

    // Update user status
    await db.collections.accounts.updateOne(
        { _id: objectId },
        {
            $set: {
                inactive,
                updatedAt: new Date()
            }
        }
    );

    return {
        success: true,
        message: inactive 
            ? 'User account has been inactivated' 
            : 'User account has been reactivated',
        userId: userId,
        inactive
    };
};
