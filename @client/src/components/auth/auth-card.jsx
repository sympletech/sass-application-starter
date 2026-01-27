import PropTypes from 'prop-types';
import './auth-card.css';

function AuthCard({ children }) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-5">
            <div className="AuthCard">
                {children}
            </div>
        </div>
    );
}

AuthCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthCard;
