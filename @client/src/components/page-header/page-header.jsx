import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * A reusable page header component with gradient text styling.
 * Used for primary page headings like About, Legal pages.
 */
const PageHeader = ({
    title = '',
    subtitle = '',
    className = ''
}) => {
    return (
        <div className={`text-center ${className}`}>
            <Title className="premium-gradient-text text-[56px] font-extrabold">
                {title}
            </Title>
            {subtitle && (
                <Paragraph className="text-xl text-text-body max-w-[700px] mx-auto">
                    {subtitle}
                </Paragraph>
            )}
        </div>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    className: PropTypes.string,
};

export default PageHeader;
