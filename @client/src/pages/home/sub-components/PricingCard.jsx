import PropTypes from 'prop-types';
import cx from 'classnames';

import { Typography, Button, Card, Badge, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import GlassCard from '@client/components/ui-elements/GlassCard.jsx';

import './PricingCard.css';

const { Title, Text } = Typography;

const PricingCard = ({ title, price, features, mostPopular = false }) => (
    <GlassCard
        className={cx('pricing-card', {
            'premium-border': mostPopular
        })}
    >
        {mostPopular && (
            <Badge.Ribbon
                text="Most Popular"
                color="#6366f1"
            />
        )}
        <Space direction="vertical" size="large" style={{ width: '100%', flex: 1 }}>
            <Title level={3}>{title}</Title>
            <div style={{ margin: '20px 0' }}>
                <Title level={1} style={{ margin: 0, display: 'inline' }}>{price}</Title>
                <Text type="secondary" style={{ fontSize: '18px' }}>/mo</Text>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '30px' }}>
                {features.map((f, i) => (
                    <li key={i} style={{ marginBottom: '12px' }}>
                        <CheckOutlined style={{ color: '#6366f1', marginRight: '8px' }} />
                        <Text>{f}</Text>
                    </li>
                ))}
            </ul>
        </Space>
        <Button
            type={mostPopular ? "primary" : "default"}
            size="large"
            block
            className={mostPopular ? "premium-button-primary" : ""}
            style={{ borderRadius: '8px', height: '48px' }}
        >
            Get Started
        </Button>
    </GlassCard>
);

PricingCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.array.isRequired,
    mostPopular: PropTypes.bool
};

export default PricingCard;