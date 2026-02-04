import PropTypes from 'prop-types';

const AuthHeader = ({ 
    title = '', 
    subtitle = '' 
}) => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-text-strong mb-2 tracking-tight">
                {title}
            </h1>
            <p className="text-text-body text-base">
                {subtitle}
            </p>
        </div>
    );
}

AuthHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default AuthHeader;
