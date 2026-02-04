import { Row, Col } from 'antd';
import {
    RocketOutlined,
    SafetyCertificateOutlined,
    CreditCardOutlined,
    CodeOutlined,
} from '@ant-design/icons';

import AppSection from '@client/components/app-section/app-section.jsx';
import SectionHeader from '@client/components/section-header/section-header.jsx';
import FeatureCard from '@client/components/feature-card/feature-card.jsx';

/**
 * Features section component for the home page.
 * Displays the key features of the product in a grid of cards.
 */
const FeaturesSection = () => {
    const features = [
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Authentication',
            description: 'Passport.js integration with local and social OAuth providers pre-configured.',
        },
        {
            icon: <CreditCardOutlined />,
            title: 'Payments',
            description: 'Full Stripe integration with subscription lifecycle management and free trials.',
        },
        {
            icon: <RocketOutlined />,
            title: 'Architecture',
            description: 'Modern stack using Express 5, React 19, and MongoDB for high performance.',
        },
        {
            icon: <CodeOutlined />,
            title: 'Developer Experience',
            description: 'Fast build times with Vite, consistent styles with Ant Design, and easy routing.',
        },
    ];

    return (
        <AppSection>
            <SectionHeader
                title="Everything you need to ship."
                subtitle="Focus on your product, not the boilerplate logic."
            />
            <Row gutter={[24, 24]}>
                {features.map((feature, index) => (
                    <Col key={index} xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    </Col>
                ))}
            </Row>
        </AppSection>
    );
};

export default FeaturesSection;
