# Create Profile Page

Path: /@/profile

Create a simple form that allows the user to view/update their profile and manage subscription/account status.

Include fields (AntD Form):
- First Name (editable)
- Last Name (editable)
- Email (read-only; single-account-per-email)

Show indicators:
- OAuth linked provider (Google or Facebook) from stored provider field
- Plan status: Free trial vs Paid (pulled from Stripe subscription)
- Account status: Active vs Inactive

Allow actions:
- Trial user: Convert to paid (end trial immediately with `trial_end=now` and start billing)
- Paid user: Cancel account (set inactive:true locally; cancel Stripe subscription at period end)
- Inactive user: Reactivate account (sets active, and recreates/restores Stripe subscription if canceled)

Rules:
- Users with inactive accounts cannot sign up for a free trial
- If an inactive user attempts to sign in (email/pw or OAuth), route to reactivation page
- Only one account per email; if email is already tied to another auth method, show hint to use that method (e.g., “Use your Google account”)

Security Rules:
- User must be logged in (server session cookie) to access any client route that starts with /@

UI/UX:
- All UI should be built using the AntD React library

---

## Notes from existing code (current state)
- Client routing: `/@` exists; `/@/profile` not yet implemented. Login currently redirects to `/dashboard` (should be `/@`).
- `LoggedInLayout` already links to `/@/profile`.
- Server uses express-session + passport for OAuth; email/password login does not yet set session.
- Signup creates a Stripe subscription with a 14-day trial.

---

## Implementation plan (final)

### 1) Account model (Mongo `accounts`)
Fields to rely on/add:
- `firstName`, `lastName`, `email`
- `isSocial`, `oauthProvider` (store 'google' or 'facebook')
- `stripeCustomerId`, `subscriptionId`
- `inactive` (boolean; default false)
- Optional derived state (server-side): `plan` ('trial' | 'paid'), `subscriptionStatus`

Single-account rule:
- On signup (any method), if email exists:
  - If provider mismatch, return error with hint to use existing method (e.g., Google).
  - If inactive, return redirect to `/reactivate?email=...`.

### 2) Server auth + user context
- Update `/auth/login` to set session (e.g., `req.session.userId = user._id`) after password check; redirect path should be `/@`.
- OAuth callback: after linking/lookup, set `req.session.userId`.
- Add `/auth/me` (protected by session) returning user profile + `inactive` + derived plan/subscription info (trial vs paid) + `oauthProvider`.
- Add `requireAuth` middleware for protected APIs.

### 3) Client route protection
- Add auth gate for `/@*` (wrapper or inside `LoggedInLayout`):
  - Call `/auth/me`; show AntD `Spin` while loading.
  - If not authenticated -> redirect to `/login`.
  - If `inactive` -> redirect to `/reactivate?email=...`.
- Fix login success redirect to `/@`.

### 4) Profile page `/@/profile` (AntD)
- Load data from `/auth/me`.
- Form to edit first/last name; save via `PATCH /account/profile` (protected).
- Show read-only email.
- Show Descriptions/Card for OAuth provider, plan (trial/paid), and account status.
- Actions:
  - If trial: button “Convert to paid” -> `POST /billing/convert-to-paid` (ends trial now; starts billing).
  - If paid: danger button “Cancel account” -> `POST /account/cancel` (sets `inactive:true`; cancels subscription at period end).
  - If inactive: show CTA to go to `/reactivate`.

### 5) Billing endpoints (protected)
- `POST /billing/convert-to-paid`
  - Preconditions: session user, not inactive, in trial.
  - Stripe: update subscription with `trial_end='now'` to start billing; return updated status.
- `POST /account/cancel`
  - Set `inactive:true`.
  - Stripe: cancel subscription at period end (no deletion).
- `POST /account/reactivate`
  - Set `inactive:false`.
  - If no active subscription or canceled, create/restore a Stripe subscription for the paid plan.

### 6) Reactivation flow
- Public route `/reactivate` with email input (prefill from query).
- On submit, call `POST /account/reactivate`.
- After success, redirect to `/login` (or directly to `/@` if session established).

### 7) Signup guardrails
- In `/auth/signup`, before creating trial:
  - If account exists and `inactive:true`, respond with error + redirect `/reactivate?email=...`.
  - If account exists with different auth method, respond with error + hint to use that method.
- Ensure signup sets session on success.

### 8) Stripe state derivation
- Determine trial vs paid from Stripe subscription fields (`status`, `trial_end`, `cancel_at_period_end`).
- Expose a concise status in `/auth/me` to drive UI.

### 9) Tests / QA checklist
- Signup with existing inactive account -> redirected to reactivation.
- Signup with mismatched provider -> receives hint to use existing provider.
- Logged-out visit to `/@/profile` -> redirected to `/login`.
- Inactive user visit `/@` -> redirected to `/reactivate`.
- Trial user converts to paid -> Stripe trial ended immediately; UI shows paid.
- Paid user cancels -> marked inactive; Stripe cancel at period end.
- Reactivation recreates/restores subscription and allows `/@` access.