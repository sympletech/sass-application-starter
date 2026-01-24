import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Button,
    Card,
    Col,
    Descriptions,
    Form,
    Input,
    Row,
    Space,
    Spin,
    Tag,
    Typography,
    message,
} from 'antd';
import axios from 'axios';

import { apiBaseUrl, getData, postData } from '@client/lib/use-api.js';
import { handleApiError } from '@client/lib/error-utils.js';

const { Title, Paragraph, Text } = Typography;

function Profile() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState(null);

    const loadProfile = async () => {
        setLoadingProfile(true);
        setError(null);
        try {
            const data = await getData('/auth/me');
            setProfile(data);
            form.setFieldsValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            });
        } catch (err) {
            setError(err);
        } finally {
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const planTag = useMemo(() => {
        if (!profile?.plan) return <Tag>Unknown</Tag>;
        return profile.plan === 'paid'
            ? <Tag color="green" className="rounded-full px-3">Paid</Tag>
            : <Tag color="blue" className="rounded-full px-3">Trial</Tag>;
    }, [profile]);

    const accountTag = useMemo(() => {
        if (profile?.inactive) return <Tag color="red" className="rounded-full px-3">Inactive</Tag>;
        return <Tag color="green" className="rounded-full px-3">Active</Tag>;
    }, [profile]);

    const providerTag = useMemo(() => {
        if (!profile?.oauthProvider) return <Tag className="rounded-full px-3">Local</Tag>;
        const label = profile.oauthProvider === 'google'
            ? 'Google'
            : profile.oauthProvider === 'facebook'
                ? 'Facebook'
                : profile.oauthProvider;
        return <Tag color="purple" className="rounded-full px-3 capitalize">{label}</Tag>;
    }, [profile]);

    const onSaveProfile = async () => {
        setSaving(true);
        try {
            const values = await form.validateFields();
            await axios.patch(
                `${apiBaseUrl}/account/profile`,
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                },
                { withCredentials: true },
            );
            message.success('Profile updated');
            await loadProfile();
        } catch (err) {
            if (err?.errorFields) {
                // Validation error already shown by antd
            } else {
                handleApiError(err, 'Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleConvertToPaid = async () => {
        setActionLoading('convert');
        try {
            await postData('/billing/convert-to-paid');
            message.success('Trial converted to paid');
            await loadProfile();
        } catch (err) {
            handleApiError(err, 'Failed to convert trial to paid');
        } finally {
            setActionLoading(null);
        }
    };

    const handleUpdateBilling = async () => {
        setActionLoading('billing');
        try {
            const { url } = await postData('/billing/create-portal-session');
            window.open(url);
        } catch (err) {
            if (err?.response?.data?.error) {
                message.error(err.response.data.error);
            } else {
                message.error('Unable to open billing portal right now');
            }
        } finally {
            setActionLoading(null);
        }
    };

    const handleCancelAccount = async () => {
        setActionLoading('cancel');
        try {
            await postData('/account/cancel');
            message.success('Account canceled. Access will remain until period end.');
            await loadProfile();
        } catch (err) {
            handleApiError(err, 'Failed to cancel subscription');
        } finally {
            setActionLoading(null);
        }
    };

    const goToReactivation = () => {
        if (profile?.email) {
            navigate(`/reactivate?email=${encodeURIComponent(profile.email)}`);
        } else {
            navigate('/reactivate');
        }
    };

    if (loadingProfile) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spin tip="Loading profile..." />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                type="error"
                message="Unable to load profile"
                description="Please try refreshing the page or logging in again."
                className="rounded-xl px-6 py-4 shadow-sm"
            />
        );
    }

    return (
        <Space direction="vertical" size="large" className="w-full">
            <div className="mb-2">
                <Title level={2} className="m-0 mb-2">Profile</Title>
                <Paragraph className="text-text-body m-0">
                    View and update your account details, subscription plan, and status.
                </Paragraph>
            </div>

            {profile?.inactive && (
                <Alert
                    type="warning"
                    showIcon
                    message="Your account is inactive"
                    description="To regain access, reactivate your account. You will not be able to start a new trial while inactive."
                    className="rounded-xl px-6 py-4 shadow-sm"
                    action={
                        <Button type="primary" onClick={goToReactivation} className="premium-button-primary border-none">
                            Reactivate account
                        </Button>
                    }
                />
            )}

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                    <Card title={<span className="font-semibold text-lg py-1 inline-block">Profile Details</span>} className="shadow-sm rounded-2xl border-surface-border">
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
                                <Button type="primary" onClick={onSaveProfile} loading={saving} className="premium-button-primary h-11 px-8 rounded-lg border-none shadow-soft">
                                    Save changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span className="font-semibold text-lg py-1 inline-block">Account & Subscription</span>} className="shadow-sm rounded-2xl border-surface-border h-full">
                        <Descriptions column={1} size="middle" className="mb-6">
                            <Descriptions.Item label={<span className="font-medium text-text-muted">OAuth provider</span>}>
                                {providerTag}
                            </Descriptions.Item>
                            <Descriptions.Item label={<span className="font-medium text-text-muted">Plan</span>}>
                                {planTag}
                            </Descriptions.Item>
                            <Descriptions.Item label={<span className="font-medium text-text-muted">Account status</span>}>
                                {accountTag}
                            </Descriptions.Item>
                            {profile?.subscriptionStatus && (
                                <Descriptions.Item label={<span className="font-medium text-text-muted">Subscription status</span>}>
                                    <Text className="capitalize font-medium">{profile.subscriptionStatus}</Text>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        <div className="space-y-3 mt-8">
                            {profile?.plan === 'trial' && !profile?.inactive && (
                                <Button
                                    type="primary"
                                    block
                                    onClick={handleConvertToPaid}
                                    loading={actionLoading === 'convert'}
                                    className="premium-button-primary h-11 rounded-lg border-none"
                                >
                                    Convert to paid
                                </Button>
                            )}

                            {!profile?.inactive && (
                                <Button
                                    block
                                    onClick={handleUpdateBilling}
                                    loading={actionLoading === 'billing'}
                                    className="h-11 rounded-lg border-surface-border hover:border-brand-500 hover:text-brand-500 transition-all font-medium"
                                >
                                    Update billing information
                                </Button>
                            )}

                            {profile?.plan === 'paid' && !profile?.inactive && (
                                <Button
                                    danger
                                    block
                                    onClick={handleCancelAccount}
                                    loading={actionLoading === 'cancel'}
                                    className="h-11 rounded-lg hover:border-red-500 font-medium"
                                >
                                    Cancel account
                                </Button>
                            )}

                            {profile?.inactive && (
                                <Button block type="primary" onClick={goToReactivation} className="premium-button-primary h-11 rounded-lg border-none">
                                    Go to reactivation
                                </Button>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

export default Profile;
