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