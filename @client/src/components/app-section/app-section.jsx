import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A standard layout component for sections with consistent padding and optional scroll-reveal functionality.
 */
const AppSection = ({
    children = <></>,
    className = '',
    id = '',
    reveal = true
}) => {
    return (
        <section
            id={id}
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
};

export default AppSection;
