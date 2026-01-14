import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography, message } from 'antd';

import AuthCard from '@client/components/auth/AuthCard.jsx';
import AuthHeader from '@client/components/auth/AuthHeader.jsx';
import { postData } from '@client/lib/use-api.js';

const { Paragraph, Text } = Typography;

function Reactivate() {
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const email = searchParams.get('email');
        if (email) {
            form.setFieldsValue({ email });
        }
    }, [form, searchParams]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const result = await postData('/account/reactivate', values);
            if (result?.success) {
                message.success(result.message || 'Account reactivated');
                const redirectTarget = result.redirect || '/login';
                setTimeout(() => {
                    window.location.href = redirectTarget;
                }, 800);
            } else {
                message.info(result?.message || 'Check your email to finish reactivation.');
            }
        } catch (err) {
            if (err?.response?.data?.error) {
                message.error(err.response.data.error);
            } else {
                message.error('Reactivation failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <AuthHeader
                title="Reactivate Your Account"
                subtitle="Restore access and billing by reactivating your subscription"
            />

            <Alert
                type="info"
                showIcon
                message="Why you’re here"
                description="Your account was previously canceled or marked inactive. Reactivate below to continue using the app."
                style={{ marginBottom: 16 }}
            />

            <Form
                form={form}
                layout="vertical"
                name="reactivate"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input placeholder="you@example.com" size="large" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                        Reactivate account
                    </Button>
                </Form.Item>
            </Form>

            <Paragraph style={{ textAlign: 'center', marginBottom: 0 }}>
                Need to sign in instead? <a href="/login">Back to login</a>
            </Paragraph>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>
                After reactivation, you’ll be redirected to your account.
            </Text>
        </AuthCard>
    );
}

export default Reactivate;
