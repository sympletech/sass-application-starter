import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthCard from '@client/components/auth/auth-card.jsx';
import AuthHeader from '@client/components/auth/auth-header.jsx';
import SocialAuthButtons from '@client/components/auth/social-auth-buttons.jsx';
import { postData } from '@client/lib/use-api.js';
import { handleApiError } from '@client/lib/error-utils.js';

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const result = await postData('/auth/login', values);

            if (result.success) {
                message.success(result.message);
                window.location.href = '/@';
            } else if (result.redirect) {
                message.info(result.message);
                setTimeout(() => {
                    window.location.href = result.redirect;
                }, 1500);
            }
        } catch (error) {
            handleApiError(error, 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <AuthHeader
                title="Welcome Back"
                subtitle="Sign in to your account"
            />

            <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-text-faint" />}
                        placeholder="Enter your email"
                        size="large"
                        className="rounded-lg h-12"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-text-faint" />}
                        placeholder="Enter your password"
                        size="large"
                        className="rounded-lg h-12"
                    />
                </Form.Item>

                <div className="text-right mb-6">
                    <Link to="/forgot-password" size="small" className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                        Forgot password?
                    </Link>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block loading={loading} className="premium-button-primary h-12 text-base shadow-soft">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>

            <SocialAuthButtons mode="login" />

            <div className="mt-8 text-center">
                <p className="text-text-muted text-sm">
                    Don&apos;t have an account? <Link to="/signup" className="text-brand-500 font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </AuthCard>
    );
}

export default Login;
