import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { GoogleIcon, FacebookIcon } from '@client/lib/social-icons.js';
import { apiBaseUrl } from '@client/lib/use-api.js';

const SocialAuthButtons = ({ 
    mode = 'login', 
    showDivider = true 
}) => {
    const handleGoogleAuth = () => {
        window.location.href = `${apiBaseUrl}/auth/google`;
    };

    const handleFacebookAuth = () => {
        window.location.href = `${apiBaseUrl}/auth/facebook`;
    };

    const actionText = mode === 'login' ? 'Login' : 'Sign up';

    return (
        <div className="w-full">
            {showDivider && (
                <Divider plain className="text-text-faint text-xs mb-6">
                    Or continue with
                </Divider>
            )}

            <div className="space-y-3">
                <Button
                    className="flex items-center justify-center gap-2 h-12 rounded-lg border-surface-border hover:border-brand-500 font-medium shadow-sm w-full transition-all"
                    size="large"
                    onClick={handleGoogleAuth}
                >
                    <GoogleIcon className="w-5 h-5" />
                    <span className="text-text-strong">{actionText} with Google</span>
                </Button>

                <Button
                    className="flex items-center justify-center gap-2 h-12 rounded-lg border-surface-border hover:border-brand-500 font-medium shadow-sm w-full transition-all"
                    size="large"
                    onClick={handleFacebookAuth}
                >
                    <FacebookIcon className="w-5 h-5" />
                    <span className="text-text-strong">{actionText} with Facebook</span>
                </Button>
            </div>
        </div>
    );
}

SocialAuthButtons.propTypes = {
    mode: PropTypes.oneOf(['login', 'signup']),
    showDivider: PropTypes.bool,
};

export default SocialAuthButtons;
