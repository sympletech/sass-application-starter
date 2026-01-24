import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button, List, Badge } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const { Title, Text } = Typography;

/**
 * A reusable Pricing Card component.
 */
const PricingCard = ({ title, price, features, mostPopular, className }) => {
    return (
        <Card
            className={classNames(
                "h-full text-center flex flex-col rounded-2xl relative",
                { "border-2 border-brand-500 shadow-glass-hover": mostPopular },
                className
            )}
            bordered={!mostPopular}
        >
            {mostPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge count="Most Popular" style={{ backgroundColor: 'var(--color-brand-500)' }} />
                </div>
            )}
            <Title level={3} className="mt-4">{title}</Title>
            <div className="mb-6">
                <span className="text-4xl font-bold text-text-title">{price}</span>
                <span className="text-text-body ml-1">/mo</span>
            </div>
            <List
                split={false}
                dataSource={features}
                renderItem={(item) => (
                    <List.Item className="justify-center border-none py-2">
                        <CheckOutlined className="text-brand-500 mr-2" />
                        <Text className="text-text-body">{item}</Text>
                    </List.Item>
                )}
            />
            <div className="mt-auto pt-8">
                <Button
                    type={mostPopular ? "primary" : "default"}
                    size="large"
                    className={classNames("w-full h-12 rounded-lg", { "premium-button-primary": mostPopular })}
                >
                    Get Started
                </Button>
            </div>
        </Card>
    );
};

PricingCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    mostPopular: PropTypes.bool,
    className: PropTypes.string,
};

PricingCard.defaultProps = {
    mostPopular: false,
    className: '',
};

export default PricingCard;
