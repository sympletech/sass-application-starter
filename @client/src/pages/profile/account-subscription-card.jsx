import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Button, Card, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

/**
 * Account subscription card component.
 * Displays account status, plan info, and subscription management actions.
 */
const AccountSubscriptionCard = ({
    profile = null,
    actionLoading = null,

    onConvertToPaid = () => { },
    onUpdateBilling = () => { },
    onCancelAccount = () => { },
    onGoToReactivation = () => { },
}) => {
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

    return (
        <Card
            title={<span className="font-semibold text-lg py-1 inline-block">Account & Subscription</span>}
            className="shadow-sm rounded-2xl border-surface-border h-full"
        >
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
                        onClick={onConvertToPaid}
                        loading={actionLoading === 'convert'}
                        className="premium-button-primary h-11 rounded-lg border-none"
                    >
                        Convert to paid
                    </Button>
                )}

                {!profile?.inactive && (
                    <Button
                        block
                        onClick={onUpdateBilling}
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
                        onClick={onCancelAccount}
                        loading={actionLoading === 'cancel'}
                        className="h-11 rounded-lg hover:border-red-500 font-medium"
                    >
                        Cancel account
                    </Button>
                )}

                {profile?.inactive && (
                    <Button
                        block
                        type="primary"
                        onClick={onGoToReactivation}
                        className="premium-button-primary h-11 rounded-lg border-none"
                    >
                        Go to reactivation
                    </Button>
                )}
            </div>
        </Card>
    );
};

AccountSubscriptionCard.propTypes = {
    profile: PropTypes.shape({
        plan: PropTypes.string,
        inactive: PropTypes.bool,
        oauthProvider: PropTypes.string,
        subscriptionStatus: PropTypes.string,
    }),
    actionLoading: PropTypes.string,
    onConvertToPaid: PropTypes.func.isRequired,
    onUpdateBilling: PropTypes.func.isRequired,
    onCancelAccount: PropTypes.func.isRequired,
    onGoToReactivation: PropTypes.func.isRequired,
};

export default AccountSubscriptionCard;
