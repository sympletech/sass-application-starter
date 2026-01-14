## Task Description

Update the Signup page to allow users to sign up for a free trial using a integrated Stripe checkout flow.

## Acceptance Criteria

- [ ] The Signup page has a form that allows users to sign up for a free trial using a integrated Stripe checkout flow.
- [ ] User should be able to signup using Facebook, Google, or creating a new account based on their email address.
- [ ] Account information should be stored in a mongo collection named `accounts`.
- [ ] Instructions should be added to the README.md file on how to set up Stripe and configure the stripe account to allow free trials and subscriptions.
- [ ] If a user tries to login from the login page and they have not yet signed up they should be redirected to the signup page.


All Mongo operations should use the `@server/lib/mongo-client.js` module.  
Operations should be performed on the db.collections.accounts collection.
All UI should be build using ANTD.
The Signup page should use the same general UI as the Login page.
Any UI elements between the Login Page and the Signup page that can be shared should be extracted into separate components.
Server routes should be establised in the @server/routes directory.
Use @server/routes/home/_home-routes.js as an example of how to build routes.
