import AppSection from '@client/components/app-section/app-section.jsx';
import PageHeader from '@client/components/page-header/page-header.jsx';

/**
 * Mission section component for the about page.
 * Displays the company mission statement.
 */
const MissionSection = () => {
    return (
        <AppSection className="pt-0 pb-20">
            <PageHeader
                title="Our Mission"
                subtitle="Empowering developers to build and scale their visions without getting bogged down by the boilerplate."
            />
        </AppSection>
    );
};

export default MissionSection;
