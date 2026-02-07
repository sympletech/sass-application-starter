import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Button,
    Col,
    Form,
    Row,
    Space,
    Spin,
    Typography,
    message,
} from 'antd';
import axios from 'axios';

import { apiBaseUrl, getData, postData } from '@client/lib/use-api.js';
import { handleApiError } from '@client/lib/error-utils.js';

import ProfileDetailsCard from './profile-details-card.jsx';
import AccountSubscriptionCard from './account-subscription-card.jsx';

const { Title, Paragraph } = Typography;

/**
 * Profile page component.
 * Allows users to view and manage their profile and subscription.
 */
const Profile = () => {
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
            await postData('/account/convert-to-paid');
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
            const { url } = await postData('/account/create-stripe-portal-session-url');
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
        <Space direction="vertical" size="large" className="w-full max-w-[1200px] mx-auto">
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
                    <ProfileDetailsCard
                        form={form}
                        profile={profile}
                        saving={saving}
                        onSaveProfile={onSaveProfile}
                    />
                </Col>

                <Col xs={24} lg={10}>
                    <AccountSubscriptionCard
                        profile={profile}
                        actionLoading={actionLoading}
                        onConvertToPaid={handleConvertToPaid}
                        onUpdateBilling={handleUpdateBilling}
                        onCancelAccount={handleCancelAccount}
                        onGoToReactivation={goToReactivation}
                    />
                </Col>
            </Row>
        </Space>
    );
};

export default Profile;
