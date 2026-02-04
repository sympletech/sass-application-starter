import { Typography, Card, Row, Col, Space } from 'antd';
import { RocketOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';

import AppSection from '@client/components/app-section/app-section.jsx';
import InfoItem from '@client/components/info-item/info-item.jsx';

const { Title, Paragraph } = Typography;

/**
 * Story section component for the about page.
 * Displays the company story and value propositions.
 */
const StorySection = () => {
    const valueProps = [
        {
            icon: <RocketOutlined />,
            title: 'Speed to Market',
            description: 'Go from idea to production in hours, not weeks.',
        },
        {
            icon: <HeartOutlined />,
            title: 'Developer First',
            description: "Clean code, documented APIs, and a stack you'll love.",
        },
        {
            icon: <TeamOutlined />,
            title: 'Scalable Choice',
            description: 'Built to handle your first user and your millionth.',
        },
    ];

    return (
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
                        Sympletech was born as a &quot;SaaS Foundation&quot; — a rock-solid, opinionated starter kit that
                        combines the best of modern tech with the ease of a unified platform.
                    </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                    <Card className="glass-card rounded-[24px] p-5">
                        <Space direction="vertical" size="large" className="w-full">
                            {valueProps.map((prop, index) => (
                                <InfoItem
                                    key={index}
                                    icon={prop.icon}
                                    title={prop.title}
                                    description={prop.description}
                                />
                            ))}
                        </Space>
                    </Card>
                </Col>
            </Row>
        </AppSection>
    );
};

export default StorySection;
