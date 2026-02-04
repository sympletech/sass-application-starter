import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import classNames from 'classnames';

const { Title, Paragraph } = Typography;

/**
 * A reusable Feature Card component with a premium gradient icon.
 */
const FeatureCard = ({
    icon = <></>,
    title = '',
    description = '',
    className = ''
}) => (
    <Card
        variant="outlined"
        className={classNames("glass-card text-center h-full rounded-2xl", className)}
    >
        <div className="text-[40px] mb-5 premium-gradient-text inline-block">
            {icon}
        </div>
        <Title level={4}>{title}</Title>
        <Paragraph className="text-text-body">{description}</Paragraph>
    </Card>
);

FeatureCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default FeatureCard;
