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
            ? <Tag color="green">Paid</Tag>
            : <Tag color="blue">Trial</Tag>;
    }, [profile]);

    const accountTag = useMemo(() => {
        if (profile?.inactive) return <Tag color="red">Inactive</Tag>;
        return <Tag color="green">Active</Tag>;
    }, [profile]);

    const providerTag = useMemo(() => {
        if (!profile?.oauthProvider) return <Tag>None</Tag>;
        const label = profile.oauthProvider === 'google'
            ? 'Google'
            : profile.oauthProvider === 'facebook'
                ? 'Facebook'
                : profile.oauthProvider;
        return <Tag color="purple">{label}</Tag>;
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
            if (err?.response?.data?.error) {
                message.error(err.response.data.error);
            } else if (err?.errorFields) {
                // Validation error already shown by antd
            } else {
                message.error('Failed to update profile');
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
            if (err?.response?.data?.error) {
                message.error(err.response.data.error);
            } else {
                message.error('Unable to convert trial right now');
            }
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
            if (err?.response?.data?.error) {
                message.error(err.response.data.error);
            } else {
                message.error('Unable to cancel account right now');
            }
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
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
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
            />
        );
    }

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
                <Title level={2} style={{ marginBottom: 8 }}>Profile</Title>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    View and update your account details, subscription plan, and status.
                </Paragraph>
            </div>

            {profile?.inactive && (
                <Alert
                    type="warning"
                    showIcon
                    message="Your account is inactive"
                    description="To regain access, reactivate your account. You will not be able to start a new trial while inactive."
                    action={
                        <Button type="primary" onClick={goToReactivation}>
                            Reactivate account
                        </Button>
                    }
                />
            )}

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                    <Card title="Profile Details">
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
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input placeholder="First name" />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input placeholder="Last name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true }]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" onClick={onSaveProfile} loading={saving}>
                                    Save changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title="Account & Subscription">
                        <Descriptions column={1} size="middle">
                            <Descriptions.Item label="OAuth provider">
                                {providerTag}
                            </Descriptions.Item>
                            <Descriptions.Item label="Plan">
                                {planTag}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account status">
                                {accountTag}
                            </Descriptions.Item>
                            {profile?.subscriptionStatus && (
                                <Descriptions.Item label="Subscription status">
                                    <Text>{profile.subscriptionStatus}</Text>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
                            {profile?.plan === 'trial' && !profile?.inactive && (
                                <Button
                                    type="primary"
                                    block
                                    onClick={handleConvertToPaid}
                                    loading={actionLoading === 'convert'}
                                >
                                    Convert to paid
                                </Button>
                            )}

                            {!profile?.inactive && (
                                <Button
                                    block
                                    onClick={handleUpdateBilling}
                                    loading={actionLoading === 'billing'}
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
                                >
                                    Cancel account
                                </Button>
                            )}

                            {profile?.inactive && (
                                <Button block type="primary" onClick={goToReactivation}>
                                    Go to reactivation
                                </Button>
                            )}
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

export default Profile;
