import { Typography, Tabs, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Legal = () => {
    const items = [
        {
            key: 'privacy',
            label: 'Privacy Policy',
            children: (
                <div style={{ padding: '20px' }}>
                    <Title level={3}>Privacy Policy</Title>
                    <Paragraph>Last updated: January 20, 2026</Paragraph>
                    <Paragraph>
                        Your privacy is important to us. It is our policy to respect your privacy regarding any
                        information we may collect from you across our website and other sites we own and operate.
                    </Paragraph>
                    <Title level={4}>1. Information we collect</Title>
                    <Paragraph>
                        We only ask for personal information when we truly need it to provide a service to you.
                        We collect it by fair and lawful means, with your knowledge and consent.
                    </Paragraph>
                    <Title level={4}>2. Use of Information</Title>
                    <Paragraph>
                        We only retain collected information for as long as necessary to provide you with your
                        requested service. What data we store, we’ll protect within commercially acceptable means.
                    </Paragraph>
                </div>
            ),
        },
        {
            key: 'terms',
            label: 'Terms of Service',
            children: (
                <div style={{ padding: '20px' }}>
                    <Title level={3}>Terms of Service</Title>
                    <Paragraph>Last updated: January 20, 2026</Paragraph>
                    <Title level={4}>1. Terms</Title>
                    <Paragraph>
                        By accessing our website, you are agreeing to be bound by these terms of service,
                        all applicable laws and regulations, and agree that you are responsible for
                        compliance with any applicable local laws.
                    </Paragraph>
                    <Title level={4}>2. Use License</Title>
                    <Paragraph>
                        Permission is granted to temporarily download one copy of the materials (information or software)
                        on our website for personal, non-commercial transitory viewing only.
                    </Paragraph>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '60px 0' }}>
            <Card style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <Title className="premium-gradient-text" style={{ padding: '0 20px' }}>Legal Information</Title>
                <Tabs defaultActiveKey="privacy" items={items} style={{ padding: '0 20px 20px 20px' }} />
            </Card>
        </div>
    );
};

export default Legal;
