import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable Logo component with gradient background.
 * @param {string} to - The route to navigate to when clicked
 * @param {string} className - Additional CSS classes for the link wrapper
 * @param {boolean} showText - Whether to show the "Sympletech" text
 * @param {boolean} isDarkMode - Whether dark mode is active (for text color)
 */
const Logo = ({ to, className, showText, isDarkMode }) => {
    return (
        <Link to={to} className={`flex items-center h-full no-underline ${className}`}>
            <div className="w-10 h-10 bg-gradient-alt rounded-lg flex items-center justify-center text-text-inverse font-bold text-xl mr-3 shadow-soft">
                S
            </div>
            {showText && (
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-text-inverse' : 'text-text-strong'}`}>
                    Sympletech
                </span>
            )}
        </Link>
    );
};

Logo.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    showText: PropTypes.bool,
    isDarkMode: PropTypes.bool,
};

Logo.defaultProps = {
    className: '',
    showText: true,
    isDarkMode: false,
};

export default Logo;
