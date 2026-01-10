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