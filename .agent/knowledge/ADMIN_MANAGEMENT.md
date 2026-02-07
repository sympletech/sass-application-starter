# Admin User Management

This document explains how to use the admin user management interface.

## Features

The admin user management interface provides the following capabilities:

1. **View All Users** - Display all registered accounts with pagination
2. **Search Users** - Search for users by email, first name, or last name
3. **Inactivate/Reactivate Accounts** - Disable or enable user accounts
4. **Manage Billing Plans** - Control user subscription states:
   - Convert trial accounts to paid subscriptions
   - Cancel subscriptions (at period end)
   - Reactivate canceled subscriptions

## Setting Up an Admin User

To access the admin interface, a user account must have the `isAdmin` flag set to `true` in the database.

### Using MongoDB Shell

```bash
# Connect to your MongoDB instance
mongosh "your-connection-string"

# Switch to your database
use your_database_name

# Set a user as admin by email
db.accounts.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

### Using MongoDB Compass

1. Connect to your MongoDB instance
2. Navigate to your database and the `accounts` collection
3. Find the user you want to make an admin
4. Edit the document and add `"isAdmin": true` to the user record
5. Save the changes

## Accessing the Admin Interface

Once an admin user is configured:

1. Log in with your admin account
2. The "User Management" link will appear in the navigation menu
3. Click on "User Management" to access the admin interface at `/@/admin/users`

## User Management Interface

### User Table Columns

- **Email** - User's email address
- **Name** - User's first and last name (if provided)
- **Status** - Active or Inactive
- **Plan** - Trial, Paid, or Canceled
- **Role** - User or Admin
- **Auth Type** - Password, Social, or OAuth provider name
- **Created** - Account creation date
- **Actions** - Management buttons (described below)

### Available Actions

#### Inactivate/Reactivate Account
- Inactivated users cannot log in
- Admin users cannot be inactivated
- Click "Inactivate" to disable an account
- Click "Reactivate" to enable a disabled account

#### Convert Trial to Paid
- Available for users on trial plans
- Immediately ends the trial and converts to a paid subscription
- Requires user to have a valid payment method on file

#### Cancel Subscription
- Available for active paid subscriptions
- Sets the subscription to cancel at the end of the current billing period
- User retains access until period end

#### Reactivate Subscription
- Available for subscriptions set to cancel
- Removes the cancellation and continues the subscription

### Search and Pagination

- Use the search bar to filter users by email, first name, or last name
- Navigate through pages using the pagination controls
- Default page size is 20 users per page
- Click "Refresh" to reload the current view

## API Endpoints

The following backend endpoints support the admin interface:

- `GET /admin/users` - List all users with pagination and search
- `POST /admin/users/update-status` - Update user active/inactive status
- `POST /admin/users/update-subscription` - Manage user subscriptions

All admin endpoints require the user to be logged in and have `isAdmin: true`.

## Security Notes

- Only users with `isAdmin: true` can access admin endpoints
- Admin users cannot inactivate other admin users
- All admin actions are processed through the backend with proper validation
- Subscription changes are made directly through Stripe

## Troubleshooting

### "Admin Access Required" Error
- Ensure your user account has `isAdmin: true` in the database
- Log out and log back in to refresh your session

### Cannot Inactivate a User
- Admin users cannot be inactivated for security reasons
- Check if the target user has admin privileges

### Subscription Actions Not Working
- Verify the user has a valid Stripe subscription ID
- Check that the subscription is in the correct state for the action
- Review server logs for Stripe API errors

## Best Practices

1. **Minimize Admin Users** - Only assign admin privileges to trusted personnel
2. **Communication** - Notify users before inactivating their accounts
3. **Billing Changes** - Understand the implications of subscription changes
4. **Regular Audits** - Periodically review user accounts and permissions
5. **Log Monitoring** - Keep track of admin actions for security and compliance
