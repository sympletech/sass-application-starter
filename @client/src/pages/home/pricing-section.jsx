import { Row, Col } from 'antd';

import AppSection from '@client/components/app-section/app-section.jsx';
import SectionHeader from '@client/components/section-header/section-header.jsx';
import PricingCard from '@client/components/pricing-card/pricing-card.jsx';

/**
 * Pricing section component for the home page.
 * Displays the pricing tiers in a grid of cards.
 */
const PricingSection = () => {
    const pricingTiers = [
        {
            title: 'Hobby',
            price: '$0',
            features: ['Single User', 'Local Auth Only', 'Community Support', 'Basic Layout'],
            mostPopular: false,
        },
        {
            title: 'Startup',
            price: '$19',
            features: ['Up to 5 Users', 'Social OAuth', 'Email Support', 'Premium Components'],
            mostPopular: false,
        },
        {
            title: 'Pro',
            price: '$49',
            features: ['Unlimited Users', 'Full Analytics', 'Priority Support', 'Stripe Dashboard'],
            mostPopular: true,
        },
        {
            title: 'Enterprise',
            price: 'Custom',
            features: ['Custom SSO', 'Dedicated DB', 'SLA Guarantee', '24/7 Phone Support'],
            mostPopular: false,
        },
    ];

    return (
        <AppSection id="pricing">
            <SectionHeader
                title="Simple, transparent pricing."
                subtitle="Start for free and scale as you grow."
            />
            <Row gutter={[24, 24]}>
                {pricingTiers.map((tier, index) => (
                    <Col key={index} xs={24} md={12} lg={6}>
                        <PricingCard
                            title={tier.title}
                            price={tier.price}
                            features={tier.features}
                            mostPopular={tier.mostPopular}
                        />
                    </Col>
                ))}
            </Row>
        </AppSection>
    );
};

export default PricingSection;
