import heroImage from '@client/assets/hero.png';

// Hooks
import { useReveal } from '@client/hooks/use-reveal.js';

// Section Components
import HeroSection from './hero-section.jsx';
import FeaturesSection from './features-section.jsx';
import PricingSection from './pricing-section.jsx';

const Home = () => {
    // Initialize reveal animations
    useReveal();

    return (
        <div className="Home overflow-hidden">
            <HeroSection heroImage={heroImage} />
            <FeaturesSection />
            <PricingSection />
        </div>
    );
};

export default Home;
