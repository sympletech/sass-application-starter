import { Divider } from 'antd';

// Hooks
import { useReveal } from '@client/hooks/use-reveal.js';

// Section Components
import MissionSection from './mission-section.jsx';
import StorySection from './story-section.jsx';
import VisionSection from './vision-section.jsx';

/**
 * About page component.
 * Displays company mission, story, and vision.
 */
const About = () => {
    // Initialize reveal animations
    useReveal();

    return (
        <div className="py-20">
            <MissionSection />
            <StorySection />
            <Divider className="my-20" />
            <VisionSection />
        </div>
    );
};

export default About;
