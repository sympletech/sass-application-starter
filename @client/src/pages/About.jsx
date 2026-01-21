import { useEffect } from 'react';
import { Typography, Space, Card, Row, Col, Divider } from 'antd';
import { RocketOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ padding: '80px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
                <Title className="premium-gradient-text" style={{ fontSize: '56px', fontWeight: 800 }}>
                    Our Mission
                </Title>
                <Paragraph style={{ fontSize: '20px', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
                    Empowering developers to build and scale their visions without getting bogged down by the boilerplate.
                </Paragraph>
            </div>

            <Row gutter={[48, 48]} align="middle" className="reveal">
                <Col xs={24} md={12}>
                    <Title level={2}>Our Story</Title>
                    <Paragraph style={{ fontSize: '18px', lineHeight: '1.8' }}>
                        In 2026, we noticed a recurring pattern: developers were spending weeks, sometimes months,
                        re-implementing the same authentication and billing flows for every new project.
                        We decided to fix that once and for all.
                    </Paragraph>
                    <Paragraph style={{ fontSize: '18px', lineHeight: '1.8' }}>
                        Sympletech was born as a "SaaS Foundation" — a rock-solid, opinionated starter kit that
                        combines the best of modern tech with the ease of a unified platform.
                    </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                    <Card className="glass-card" style={{ borderRadius: '24px', padding: '20px' }}>
                        <Space direction="vertical" size="large">
                            <div>
                                <Title level={4}><RocketOutlined style={{ color: '#6366f1' }} /> Speed to Market</Title>
                                <Text type="secondary">Go from idea to production in hours, not weeks.</Text>
                            </div>
                            <div>
                                <Title level={4}><HeartOutlined style={{ color: '#6366f1' }} /> Developer First</Title>
                                <Text type="secondary">Clean code, documented APIs, and a stack you'll love.</Text>
                            </div>
                            <div>
                                <Title level={4}><TeamOutlined style={{ color: '#6366f1' }} /> Scalable Choice</Title>
                                <Text type="secondary">Built to handle your first user and your millionth.</Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Divider style={{ margin: '80px 0' }} />

            <div style={{ textAlign: 'center' }}>
                <Title level={2}>Our Vision</Title>
                <Paragraph style={{ fontSize: '18px', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
                    We believe that the future of software development lies in abstraction.
                    By providing the core pillars of any application as a service, we free up human potential
                    to focus on what truly matters: **innovation**.
                </Paragraph>
            </div>
        </div>
    );
};

export default About;
