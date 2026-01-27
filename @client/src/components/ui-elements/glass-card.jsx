import PropTypes from 'prop-types';
import cx from 'classnames';
import { Card } from 'antd';

import './glass-card.css';

const GlassCard = ({
    children = <></>,
    className = ''
}) => (
    <Card
        className={cx('glass-card', className)}
    >
        {children}
    </Card>
);

GlassCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default GlassCard;
