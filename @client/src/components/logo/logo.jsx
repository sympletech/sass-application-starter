import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import sympletechLogo from '@client/assets/sympletech-logo.png';

const Logo = ({ 
    href, 
    className = ''
}) => {
    return (
        <Link to={href} className={`flex items-center h-full no-underline ${className}`}>
            <img src={sympletechLogo} alt="Sympletech Application Starter" className="w-150 h-10 mr-3" />
        </Link>
    );
};

Logo.propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Logo;
