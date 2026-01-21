import { Typography, Space, Card, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    return (
        <div style={{ padding: '60px 0' }}>
            <Typography>
                <Title className="premium-gradient-text" style={{ textAlign: 'center', fontSize: '48px', marginBottom: '40px' }}>
                    About Our Platform
                </Title>

                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} md={16}>
                        <Card bordered={false} className="glass-card" style={{ borderRadius: '16px' }}>
                            <Title level={2}>Our Mission</Title>
                            <Paragraph style={{ fontSize: '18px', lineHeight: '1.8' }}>
                                We are on a mission to provide developers with the most robust, scalpable, and feature-rich
                                starter kit for building standard SaaS applications. Our focus is on developer experience,
                                security, and out-of-the-box integrations that actually work.
                            </Paragraph>

                            <Title level={2}>What We Built</Title>
                            <Paragraph style={{ fontSize: '18px', lineHeight: '1.8' }}>
                                This starter combines the power of React 19, Express 5, and Stripe to handle the heavy lifting
                                of authentication, subscription management, and responsive layouts.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>

                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                    <Title level={3}>Built by Developers, for Developers.</Title>
                    <Text type="secondary">Est. 2026 — Based in the Future.</Text>
                </div>
            </Typography>
        </div>
    );
};

export default About;
