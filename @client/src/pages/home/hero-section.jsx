import { Typography, Button, Row, Col, Badge, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppSection from '@client/components/app-section/app-section.jsx';

const { Title, Paragraph, Text } = Typography;

/**
 * Hero section component for the home page.
 * Displays the main headline, tagline, CTAs, and hero image.
 */
const HeroSection = ({ heroImage }) => {
    return (
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
    );
};

HeroSection.propTypes = {
    heroImage: PropTypes.string.isRequired,
};

export default HeroSection;
