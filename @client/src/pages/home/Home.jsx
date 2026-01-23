import { useEffect } from 'react';
import { Typography, Button, Row, Col, Card, Badge, Space } from 'antd';
import {
    RocketOutlined,
    SafetyCertificateOutlined,
    CreditCardOutlined,
    CodeOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import heroImage from '@client/assets/hero.png';

const { Title, Paragraph, Text } = Typography;

import PricingCard from './sub-components/PricingCard.jsx';

const FeatureCard = ({ icon, title, description }) => (
    <Card bordered={false} className="glass-card" style={{ textAlign: 'center', height: '100%', borderRadius: '16px' }}>
        <div style={{
            fontSize: '40px',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
        }}>
            {icon}
        </div>
        <Title level={4}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
    </Card>
);

function Home() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* HERO SECTION */}
            <section style={{ padding: '80px 0', position: 'relative' }}>
                <div className="glow-bg" />
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} lg={12}>
                        <Space direction="vertical" size="large">
                            <Badge
                                color="purple"
                                text={<Text strong style={{ color: '#6366f1' }}>V1.0 ALPHA — JUST RELEASED</Text>}
                                style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '4px 12px', borderRadius: '100px' }}
                            />
                            <Title style={{ fontSize: '64px', lineHeight: '1.1', fontWeight: 800, margin: 0 }}>
                                The Ultimate Foundation for your <br />
                                <span className="premium-gradient-text">Next Big Idea</span>
                            </Title>
                            <Paragraph style={{ fontSize: '20px', color: '#64748b', maxWidth: '500px' }}>
                                A premium SaaS starter kit built with React 19, Express 5, and Stripe.
                                Scale your business faster with pre-built authentication, billing, and layouts.
                            </Paragraph>
                            <Space size="middle">
                                <Link to="/signup">
                                    <Button type="primary" size="large" className="premium-button-primary" style={{ height: '56px', padding: '0 32px' }}>
                                        Get Started For Free <ArrowRightOutlined />
                                    </Button>
                                </Link>
                                <Button size="large" style={{ height: '56px', padding: '0 32px', borderRadius: '8px' }}>
                                    View Demo
                                </Button>
                            </Space>
                        </Space>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div style={{
                            position: 'relative',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            transform: 'perspective(1000px) rotateY(-10deg) rotateX(2deg)'
                        }}>
                            <img src={heroImage} alt="Dashboard Mockup" style={{ width: '100%', display: 'block' }} />
                        </div>
                    </Col>
                </Row>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 0' }} className="reveal">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Title level={2}>Everything you need to ship.</Title>
                    <Paragraph style={{ fontSize: '18px', color: '#64748b' }}>
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
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" style={{ padding: '100px 0' }} className="reveal">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Title level={2}>Simple, transparent pricing.</Title>
                    <Paragraph style={{ fontSize: '18px', color: '#64748b' }}>
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
            </section>
        </div>
    );
}

export default Home;
