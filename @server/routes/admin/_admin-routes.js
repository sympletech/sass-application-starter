import listUsers from './list-users.js';
import updateUserStatus from './update-user-status.js';
import updateUserSubscription from './update-user-subscription.js';

export default ({ adminGet, adminPost }) => {
    adminGet('/admin/users', listUsers);
    adminPost('/admin/users/update-status', updateUserStatus);
    adminPost('/admin/users/update-subscription', updateUserSubscription);
};
