import PropTypes from 'prop-types';
import { Button, Card, Form, Input } from 'antd';

/**
 * Profile details card component.
 * Displays and allows editing of user profile information.
 */
const ProfileDetailsCard = ({ form, profile, saving, onSaveProfile }) => {
    return (
        <Card
            title={<span className="font-semibold text-lg py-1 inline-block">Profile Details</span>}
            className="shadow-sm rounded-2xl border-surface-border"
        >
            <Form
                layout="vertical"
                form={form}
                requiredMark={false}
                initialValues={{
                    firstName: profile?.firstName,
                    lastName: profile?.lastName,
                    email: profile?.email,
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Form.Item
                        name="firstName"
                        label={<span className="text-text-strong font-medium">First Name</span>}
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input placeholder="First name" className="rounded-lg h-10" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label={<span className="text-text-strong font-medium">Last Name</span>}
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input placeholder="Last name" className="rounded-lg h-10" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="email"
                    label={<span className="text-text-strong font-medium">Email</span>}
                    rules={[{ required: true }]}
                >
                    <Input disabled className="rounded-lg h-10 bg-surface-muted" />
                </Form.Item>

                <Form.Item className="mt-4 mb-0">
                    <Button
                        type="primary"
                        onClick={onSaveProfile}
                        loading={saving}
                        className="premium-button-primary h-11 px-8 rounded-lg border-none shadow-soft"
                    >
                        Save changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

ProfileDetailsCard.propTypes = {
    form: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }),
    saving: PropTypes.bool,
    onSaveProfile: PropTypes.func.isRequired,
};

ProfileDetailsCard.defaultProps = {
    profile: null,
    saving: false,
};

export default ProfileDetailsCard;
