import { Typography } from 'antd';

import AppSection from '@client/components/app-section/app-section.jsx';

const { Title, Paragraph } = Typography;

/**
 * Vision section component for the about page.
 * Displays the company's vision for the future.
 */
const VisionSection = () => {
    return (
        <AppSection className="text-center">
            <Title level={2}>Our Vision</Title>
            <Paragraph className="text-lg text-text-body max-w-[800px] mx-auto">
                We believe that the future of software development lies in abstraction.
                By providing the core pillars of any application as a service, we free up human potential
                to focus on what truly matters: <span className="font-bold italic">innovation</span>.
            </Paragraph>
        </AppSection>
    );
};

export default VisionSection;
