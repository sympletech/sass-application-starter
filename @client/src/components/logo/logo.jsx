import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = ({ 
    href, 
    className = '', 
    showText = true, 
    isDarkMode = false 
}) => {
    return (
        <Link to={href} className={`flex items-center h-full no-underline ${className}`}>
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
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    showText: PropTypes.bool,
    isDarkMode: PropTypes.bool,
};

export default Logo;
