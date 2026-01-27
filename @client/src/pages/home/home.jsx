import { Typography, Button, Row, Col, Badge, Space } from 'antd';
import {
    RocketOutlined,
    SafetyCertificateOutlined,
    CreditCardOutlined,
    CodeOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import heroImage from '@client/assets/hero.png';
import './home.css';

// Hooks
import { useReveal } from '@client/hooks/use-reveal.js';

// Components
import AppSection from '@client/components/AppSection/app-section.jsx';
import FeatureCard from '@client/components/FeatureCard/feature-card.jsx';
import PricingCard from '@client/components/PricingCard/pricing-card.jsx';

const { Title, Paragraph, Text } = Typography;

function Home() {
    // Initialize reveal animations
    useReveal();

    return (
        <div className="Home overflow-hidden">
            {/* HERO SECTION */}
            <AppSection reveal={false} className="pt-20 lg:pt-32">
                <div className="glow-bg" />
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} lg={12}>
                        <Space direction="vertical" size="large" className="w-full">
                            <Badge
                                color="var(--color-brand-500)"
                                text={<Text strong className="text-brand-500">V1.0 ALPHA — JUST RELEASED</Text>}
                                className="bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20"
                            />
                            <Title className="text-[48px] md:text-[64px] leading-tight font-extrabold m-0">
                                The Ultimate Foundation for your <br />
                                <span className="premium-gradient-text">Next Big Idea</span>
                            </Title>
                            <Paragraph className="text-xl text-text-body max-w-[500px]">
                                A premium SaaS starter kit built with React 19, Express 5, and Stripe.
                                Scale your business faster with pre-built authentication, billing, and layouts.
                            </Paragraph>
                            <Space size="middle" className="pt-4">
                                <Link to="/signup">
                                    <Button type="primary" size="large" className="premium-button-primary h-14 px-8">
                                        Get Started For Free <ArrowRightOutlined />
                                    </Button>
                                </Link>
                                <Button size="large" className="h-14 px-8 rounded-lg">
                                    View Demo
                                </Button>
                            </Space>
                        </Space>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className="relative shadow-hero rounded-[24px] overflow-hidden perspective-[1000px] rotate-y-[-10deg] rotate-x-[2deg]">
                            <img src={heroImage} alt="Dashboard Mockup" className="w-full block" />
                        </div>
                    </Col>
                </Row>
            </AppSection>

            {/* FEATURES SECTION */}
            <AppSection>
                <div className="text-center mb-16">
                    <Title level={2}>Everything you need to ship.</Title>
                    <Paragraph className="text-lg text-text-body">
                        Focus on your product, not the boilerplate logic.
                    </Paragraph>
                </div>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<SafetyCertificateOutlined />}
                            title="Authentication"
                            description="Passport.js integration with local and social OAuth providers pre-configured."
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<CreditCardOutlined />}
                            title="Payments"
                            description="Full Stripe integration with subscription lifecycle management and free trials."
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<RocketOutlined />}
                            title="Architecture"
                            description="Modern stack using Express 5, React 19, and MongoDB for high performance."
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<CodeOutlined />}
                            title="Developer Experience"
                            description="Fast build times with Vite, consistent styles with Ant Design, and easy routing."
                        />
                    </Col>
                </Row>
            </AppSection>

            {/* PRICING SECTION */}
            <AppSection id="pricing">
                <div className="text-center mb-16">
                    <Title level={2}>Simple, transparent pricing.</Title>
                    <Paragraph className="text-lg text-text-body">
                        Start for free and scale as you grow.
                    </Paragraph>
                </div>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12} lg={6}>
                        <PricingCard
                            title="Hobby"
                            price="$0"
                            features={["Single User", "Local Auth Only", "Community Support", "Basic Layout"]}
                        />
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <PricingCard
                            title="Startup"
                            price="$19"
                            features={["Up to 5 Users", "Social OAuth", "Email Support", "Premium Components"]}
                        />
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <PricingCard
                            title="Pro"
                            price="$49"
                            features={["Unlimited Users", "Full Analytics", "Priority Support", "Stripe Dashboard"]}
                            mostPopular={true}
                        />
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <PricingCard
                            title="Enterprise"
                            price="Custom"
                            features={["Custom SSO", "Dedicated DB", "SLA Guarantee", "24/7 Phone Support"]}
                        />
                    </Col>
                </Row>
            </AppSection>
        </div>
    );
}

export default Home;
