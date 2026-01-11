import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { apiBaseUrl } from '@client/lib/use-api.js';
import { GoogleIcon, FacebookIcon, XIcon } from '@client/lib/social-icons.js';

import './Login.css';

function Login() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Login form values:', values);
        // Handle regular login here
    };

    const handleGoogleLogin = () => {
        window.location.href = `${apiBaseUrl}/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${apiBaseUrl}/auth/facebook`;
    };

    const handleXLogin = () => {
        window.location.href = `${apiBaseUrl}/auth/twitter`;
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

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
                        <Button type="primary" htmlType="submit" size="large" block>
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <Divider plain>Or continue with</Divider>

                <Button
                    className="oauth-login-button"
                    size="large"
                    block
                    onClick={handleGoogleLogin}
                >
                    <GoogleIcon />
                    Login with Google
                </Button>

                <Button
                    className="oauth-login-button"
                    size="large"
                    block
                    onClick={handleFacebookLogin}
                    style={{ marginTop: '12px' }}
                >
                    <FacebookIcon />
                    Login with Facebook
                </Button>

                <Button
                    className="oauth-login-button"
                    size="large"
                    block
                    onClick={handleXLogin}
                    style={{ marginTop: '12px' }}
                >
                    <XIcon />
                    Login with X
                </Button>

                <div className="login-footer">
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
