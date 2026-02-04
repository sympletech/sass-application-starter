import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * A reusable section header component with consistent title and subtitle styling.
 * Used for section headings throughout the application.
 */
const SectionHeader = ({
    title = '',
    subtitle = '',
    level = 2,
    centered = true,
    className = ''
}) => {
    return (
        <div className={`${centered ? 'text-center' : ''} mb-16 ${className}`}>
            <Title level={level}>{title}</Title>
            {subtitle && (
                <Paragraph className="text-lg text-text-body">
                    {subtitle}
                </Paragraph>
            )}
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    level: PropTypes.number,
    centered: PropTypes.bool,
    className: PropTypes.string,
};

export default SectionHeader;
