import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title, Text } = Typography;

/**
 * A reusable info item component with icon, title, and description.
 * Used for feature highlights, value propositions, etc.
 */
const InfoItem = ({
    className = '',
    icon = <></>,
    title = '',
    description = ''
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Title level={4} className="flex items-center gap-2">
                <span className="text-brand-500">{icon}</span> {title}
            </Title>
            <Text type="secondary">{description}</Text>
        </div>
    );
};

InfoItem.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default InfoItem;
