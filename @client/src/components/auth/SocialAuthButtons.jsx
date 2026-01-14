import { Button, Divider } from 'antd';
import { GoogleIcon, FacebookIcon } from '@client/lib/social-icons.js';
import { apiBaseUrl } from '@client/lib/use-api.js';
import './SocialAuthButtons.css';

function SocialAuthButtons({ mode = 'login', showDivider = true }) {
    const handleGoogleAuth = () => {
        window.location.href = `${apiBaseUrl}/auth/google`;
    };

    const handleFacebookAuth = () => {
        window.location.href = `${apiBaseUrl}/auth/facebook`;
    };

    const actionText = mode === 'login' ? 'Login' : 'Sign up';

    return (
        <>
            {showDivider && <Divider plain>Or continue with</Divider>}

            <Button
                className="oauth-button"
                size="large"
                block
                onClick={handleGoogleAuth}
            >
                <GoogleIcon />
                {actionText} with Google
            </Button>

            <Button
                className="oauth-button"
                size="large"
                block
                onClick={handleFacebookAuth}
                style={{ marginTop: '12px' }}
            >
                <FacebookIcon />
                {actionText} with Facebook
            </Button>
        </>
    );
}

export default SocialAuthButtons;
