import { Typography, Space, Card, Row, Col, Divider } from 'antd';
import { RocketOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';

// Hooks
import { useReveal } from '@client/hooks/useReveal.js';

// Components
import AppSection from '@client/components/AppSection/AppSection.jsx';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    // Initialize reveal animations
    useReveal();

    return (
        <div className="py-20">
            <AppSection className="text-center pt-0 pb-20">
                <Title className="premium-gradient-text text-[56px] font-extrabold">
                    Our Mission
                </Title>
                <Paragraph className="text-xl text-text-body max-w-[700px] mx-auto">
                    Empowering developers to build and scale their visions without getting bogged down by the boilerplate.
                </Paragraph>
            </AppSection>

            <AppSection className="py-0">
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} md={12}>
                        <Title level={2}>Our Story</Title>
                        <Paragraph className="text-lg leading-relaxed">
                            In 2026, we noticed a recurring pattern: developers were spending weeks, sometimes months,
                            re-implementing the same authentication and billing flows for every new project.
                            We decided to fix that once and for all.
                        </Paragraph>
                        <Paragraph className="text-lg leading-relaxed">
                            Sympletech was born as a "SaaS Foundation" — a rock-solid, opinionated starter kit that
                            combines the best of modern tech with the ease of a unified platform.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card className="glass-card rounded-[24px] p-5">
                            <Space direction="vertical" size="large" className="w-full">
                                <div className="flex flex-col">
                                    <Title level={4} className="flex items-center gap-2">
                                        <RocketOutlined className="text-brand-500" /> Speed to Market
                                    </Title>
                                    <Text type="secondary">Go from idea to production in hours, not weeks.</Text>
                                </div>
                                <div className="flex flex-col">
                                    <Title level={4} className="flex items-center gap-2">
                                        <HeartOutlined className="text-brand-500" /> Developer First
                                    </Title>
                                    <Text type="secondary">Clean code, documented APIs, and a stack you'll love.</Text>
                                </div>
                                <div className="flex flex-col">
                                    <Title level={4} className="flex items-center gap-2">
                                        <TeamOutlined className="text-brand-500" /> Scalable Choice
                                    </Title>
                                    <Text type="secondary">Built to handle your first user and your millionth.</Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </AppSection>

            <Divider className="my-20" />

            <AppSection className="text-center">
                <Title level={2}>Our Vision</Title>
                <Paragraph className="text-lg text-text-body max-w-[800px] mx-auto">
                    We believe that the future of software development lies in abstraction.
                    By providing the core pillars of any application as a service, we free up human potential
                    to focus on what truly matters: <span className="font-bold italic">innovation</span>.
                </Paragraph>
            </AppSection>
        </div>
    );
};

export default About;
