## Task Description

Update the Signup page to allow users to sign up for a free trial using an embedded Stripe Elements payment form. The signup flow should require a credit card upfront to initiate the trial and must match the existing application's aesthetic.

## Acceptance Criteria

### Front-end (UI/UX)
- [x] **Shared Components**: Refactor common UI elements from `Login.jsx` (e.g., specific layouts, social buttons, styles) into reusable components to ensure `Signup.jsx` matches `Login.jsx` exactly in look and feel.
- [x] **Signup Form**: Create a form with:
    - Email Input (Validation required).
    - Password Input (Validation required).
    - **Stripe Elements**: Embed the Stripe Payment Element directly into the form for collecting credit card details.
- [x] **Redirect Logic**: If a user attempts to login but has no account, redirect them to this signup page.
- [x] **Social Auth**: Include "Sign up with Google" and "Sign up with Facebook" options.

### Back-end (Server & Database)
- [x] **Database**: Store user accounts in a Mongo collection named `accounts`.
    - Use `@server/lib/mongo-client.js` for all DB operations.
- [x] **Password Security**: Passwords MUST be encrypted using a salt stored in an environment variable (`PASSWORD_SALT` or similar). Do not rely on default/random salts; use the env var as requested.
- [x] **Stripe Integration**:
    - Create a **Stripe Customer** object for every new signup.
    - Validate the credit card details.
    - Create a subscription with a free trial period for the user.
- [x] **Routing**: Establish new server routes in `@server/routes` (e.g., `@server/routes/auth/signup.js`) following patterns in `@server/routes/home/_home-routes.js`.

### Configuration & Documentation
- [x] **README**: Add comprehensive instructions to `README.md`:
    - How to set up Stripe API keys.
    - How to configure the Stripe Dashboard for products/prices with free trials.
    - Required environment variables (Stripe keys, Salt).

## Technical Implementation Notes
- **UI Framework**: usage of Ant Design (AntD) is mandatory.
- **Stripe**: Use the official Stripe Node.js library and React Stripe.js.
- **Environment**: Ensure all secrets (Stripe Secret Key, Password Salt) are loaded from `.env`.
