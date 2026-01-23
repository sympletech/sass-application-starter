# Sympletech Application Starter

This is a premium SaaS starter template designed for high-end web applications.

## Development Methodology (GSD)

This project uses the **GSD (Get Shit Done)** methodology — a spec-driven, context-engineered development flow designed for building reliable software with AI.

### 🚀 Core Workflow

1.  **Map (`/map`)**: Analyze the codebase structure and update documentation.
2.  **Plan (`/plan [N]`)**: Decompose requirements into executable tasks for a specific phase.
3.  **Execute (`/execute [N]`)**: Implement the phase with atomic commits and focused context.
4.  **Verify (`/verify [N]`)**: Validate the implementation against the spec with empirical evidence.

### 🎮 Essential Commands

| Command | Description |
| :--- | :--- |
| `/new-project` | Initialize a new project and create `SPEC.md`. |
| `/progress` | Show current position in the roadmap and next steps. |
| `/debug [desc]` | Systematic debugging with persistent state. |
| `/pause` | Save state for context handoff between sessions. |
| `/resume` | Restore context from a previous session. |
| `/help` | List all 25+ available GSD commands. |

### 🔒 The Planning Lock

To ensure high-quality development, implementation code is locked until:
- `.gsd/SPEC.md` contains **"Status: FINALIZED"**
- `.gsd/ROADMAP.md` exists and contains defined phases.

### 💡 Typical Session

```bash
/resume            # Load context from last session
/progress          # See where you left off
/plan 2            # Plan the next phase
/execute 2         # Implement with atomic commits
/verify 2          # Prove it works (screenshots, logs)
/pause             # Save state for later
```

For more details, visit the [GSD for Antigravity](https://github.com/toonight/get-shit-done-for-antigravity) repository.

---

## How to set up Google Auth

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing project
    - Click on the project selector in the top left corner
    - Click on 'New Project'
    - Enter a project name
    - Click 'Create'    
3. Create credentials
    - Click on 'APIs & Services' in the left sidebar
    - Click on 'Credentials'
    - Click on 'Create Credentials'
    - Select 'OAuth client ID'
    - Select 'Web application'
    - Enter a name for the application
    - Add 'http://localhost:3000' to the authorized redirect URIs
    - Add 'http://localhost:3000/auth/google/callback' to the authorized redirect URIs
        - Also add the production URL if you have one
    - Click 'Create'
    - Add the client ID and client secret to the .env file
        - GOOGLE_OAUTH_CLIENT_ID
        - GOOGLE_OAUTH_CLIENT_SECRET

## How to set up Facebook Auth

1. Go to the Facebook Developers Portal (https://developers.facebook.com/)
2. Create a new app or select an existing app
    - Click on 'My Apps' in the top right corner
    - Click on 'Create App'
    - Select 'Consumer' as the app type (or the type that fits your use case)
    - Enter an app name and contact email
    - Click 'Create App'
3. Set up Facebook Login
    - In the app dashboard, click on 'Add Product'
    - Find 'Facebook Login' and click 'Set Up'
    - Select 'Web' as the platform
    - Enter your site URL (e.g., 'http://localhost:3001' for development)
    - Click 'Save' and 'Continue'
4. Configure OAuth settings
    - In the left sidebar, click on 'Facebook Login' > 'Settings'
    - Add the following to 'Valid OAuth Redirect URIs':
        - `http://localhost:3000/auth/facebook/callback` (for development)
        - Also add your production URL if you have one (e.g., `https://yourdomain.com/auth/facebook/callback`)
    - Click 'Save Changes'
5. Get your App ID and App Secret
    - In the left sidebar, click on 'Settings' > 'Basic'
    - Copy your 'App ID' and 'App Secret'
    - Add them to your .env file:
        - FACEBOOK_APP_ID
        - FACEBOOK_APP_SECRET
6. Make your app live (when ready for production)
    - By default, your app is in 'Development' mode
    - To make it available to all users, you'll need to switch it to 'Live' mode
    - This requires completing the App Review process if you're requesting advanced permissions

## How to set up Twitter (X) Auth

1. Go to the Twitter Developer Portal (https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or select an existing app
    - Click on 'Projects & Apps' in the left sidebar
    - Click on '+ Create App' (or '+ Add App' if you have a project)
    - Enter an app name
    - Click 'Complete' or 'Next'
3. Set up OAuth 1.0a settings
    - In your app's dashboard, click on the 'Settings' tab
    - Scroll down to 'User authentication settings'
    - Click 'Set up' or 'Edit'
    - Enable 'OAuth 1.0a'
    - Set 'App permissions' to 'Read' (or 'Read and write' if needed)
    - Set 'Request email from users' to enabled (if you need email access)
    - Add the following to 'Callback URI / Redirect URL':
        - `http://localhost:3000/auth/twitter/callback` (for development)
        - Also add your production URL if you have one (e.g., `https://yourdomain.com/auth/twitter/callback`)
    - Enter your 'Website URL' (e.g., `http://localhost:3001` for development)
    - Click 'Save'
4. Get your API Keys
    - In your app's dashboard, click on the 'Keys and tokens' tab
    - Under 'Consumer Keys', you'll find:
        - API Key (this is your Consumer Key)
        - API Key Secret (this is your Consumer Secret)
    - Copy these values and add them to your .env file:
        - TWITTER_CLIENT_ID=your_api_key_here
        - TWITTER_CLIENT_SECRET=your_api_key_secret_here
5. Note about Twitter API Access
    - You'll need at least 'Free' tier access to use OAuth
    - If you don't have access yet, you may need to apply for a developer account
    - Follow the prompts to describe your use case

## How to set up Stripe for Free Trials

1. **Create a Stripe Account**: Go to [Stripe](https://stripe.com) and sign up.
2. **Get API Keys**:
    - Go to the **Developers** > **API keys** tab.
    - Copy the **Publishable key** and add it to your `.env` as `VITE_STRIPE_PUBLISHABLE_KEY`.
    - Copy the **Secret key** and add it to your `.env` as `STRIPE_SECRET_KEY`.
3. **Create a Product & Price**:
    - Go to **Product catalog** and click **+ Add product**.
    - Name your product (e.g., "Pro Plan").
    - Set a **Recurring** price (e.g., $19.99/month).
    - Click **Save product**.
    - Copy the **Price ID** (starts with `price_...`) and add it to your `.env` as `STRIPE_TRIAL_PRICE_ID`.
4. **Configure Trial Period**:
    - The trial period is currently hardcoded to 14 days in `@server/routes/auth/_auth-routes.js`. You can also configure default trials in the Stripe Dashboard, but the server-side override is used in this implementation.
5. **Password Salt**:
    - Ensure you have a `PASSWORD_SALT` in your `.env` for secure password hashing.