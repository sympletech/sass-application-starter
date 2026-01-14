import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

import AuthCard from '@client/components/auth/AuthCard.jsx';
import AuthHeader from '@client/components/auth/AuthHeader.jsx';
import SocialAuthButtons from '@client/components/auth/SocialAuthButtons.jsx';
import { postData } from '@client/lib/use-api.js';

import './Login.css';

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
                // Wait a bit so user can read the message
                setTimeout(() => {
                    window.location.href = result.redirect;
                }, 1500);
            }
        } catch (error) {
            if (error.response?.data?.error) {
                message.error(error.response.data.error);
            } else {
                message.error('Login failed. Please try again.');
            }
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
                        prefix={<UserOutlined />}
                        placeholder="Enter your email"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter your password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>

            <SocialAuthButtons mode="login" />

            <div className="login-footer">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </AuthCard>
    );
}

export default Login;
