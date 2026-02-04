import { Typography, Tabs, Card } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Privacy policy tab content component.
 */
const PrivacyPolicy = () => (
    <div className="p-5">
        <Title level={3}>Privacy Policy</Title>
        <Paragraph>Last updated: January 20, 2026</Paragraph>
        <Paragraph className="text-text-body">
            Your privacy is important to us. It is our policy to respect your privacy regarding any
            information we may collect from you across our website and other sites we own and operate.
        </Paragraph>
        <Title level={4}>1. Information we collect</Title>
        <Paragraph className="text-text-body">
            We only ask for personal information when we truly need it to provide a service to you.
            We collect it by fair and lawful means, with your knowledge and consent.
        </Paragraph>
        <Title level={4}>2. Use of Information</Title>
        <Paragraph className="text-text-body">
            We only retain collected information for as long as necessary to provide you with your
            requested service. What data we store, we&apos;ll protect within commercially acceptable means.
        </Paragraph>
    </div>
);

/**
 * Terms of service tab content component.
 */
const TermsOfService = () => (
    <div className="p-5">
        <Title level={3}>Terms of Service</Title>
        <Paragraph>Last updated: January 20, 2026</Paragraph>
        <Title level={4}>1. Terms</Title>
        <Paragraph className="text-text-body">
            By accessing our website, you are agreeing to be bound by these terms of service,
            all applicable laws and regulations, and agree that you are responsible for
            compliance with any applicable local laws.
        </Paragraph>
        <Title level={4}>2. Use License</Title>
        <Paragraph className="text-text-body">
            Permission is granted to temporarily download one copy of the materials (information or software)
            on our website for personal, non-commercial transitory viewing only.
        </Paragraph>
    </div>
);

/**
 * Legal page component.
 * Contains Privacy Policy and Terms of Service tabs.
 */
const Legal = () => {
    const items = [
        {
            key: 'privacy',
            label: 'Privacy Policy',
            children: <PrivacyPolicy />,
        },
        {
            key: 'terms',
            label: 'Terms of Service',
            children: <TermsOfService />,
        },
    ];

    return (
        <div className="py-16">
            <Card className="rounded-2xl overflow-hidden">
                <Title className="premium-gradient-text px-5 mt-4">Legal Information</Title>
                <Tabs
                    defaultActiveKey="privacy"
                    items={items}
                    className="px-5 pb-5"
                />
            </Card>
        </div>
    );
};

export default Legal;
