import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A standard layout component for sections with consistent padding and optional scroll-reveal functionality.
 */
const AppSection = ({
    children,
    className,
    id,
    reveal,
    style
}) => {
    return (
        <section
            id={id}
            style={style}
            className={classNames(
                'py-20 lg:py-24 relative',
                { 'reveal': reveal },
                className
            )}
        >
            {children}
        </section>
    );
};

AppSection.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    reveal: PropTypes.bool,
    style: PropTypes.object,
};

AppSection.defaultProps = {
    className: '',
    id: '',
    reveal: true,
    style: {},
};

export default AppSection;
