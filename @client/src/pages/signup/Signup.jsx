import { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import AuthCard from '@client/components/auth/AuthCard.jsx';
import AuthHeader from '@client/components/auth/AuthHeader.jsx';
import SocialAuthButtons from '@client/components/auth/SocialAuthButtons.jsx';
import PaymentForm from '@client/components/auth/PaymentForm.jsx';
import { postData, getData } from '@client/lib/use-api.js';

import './Signup.css';

function Signup() {
    const [form] = Form.useForm();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch Stripe configuration
        getData('/auth/stripe-config').then(config => {
            if (config.publishableKey) {
                setStripePromise(loadStripe(config.publishableKey));
            }
        }).catch(err => {
            console.error('Failed to load Stripe config:', err);
        });

        // Create SetupIntent
        postData('/auth/create-setup-intent').then(res => {
            setClientSecret(res.clientSecret);
        }).catch(err => {
            console.error('Failed to create setup intent:', err);
        });
    }, []);

    const handleSignup = async (paymentMethodId) => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);

            const result = await postData('/auth/signup', {
                email: values.email,
                password: values.password,
                paymentMethodId
            });

            if (result.success) {
                message.success(result.message);
                // Redirect to dashboard or login
                window.location.href = '/dashboard';
            }
        } catch (error) {
            if (error.response?.data?.error) {
                message.error(error.response.data.error);
            } else if (error.message) {
                message.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthCard>
            <AuthHeader
                title="Start Your Free Trial"
                subtitle="14 days of full access, no strings attached"
            />

            <Form
                form={form}
                name="signup"
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
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Create a password"
                        size="large"
                    />
                </Form.Item>

                {stripePromise && clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            onPaymentMethodCreated={handleSignup}
                            loading={isSubmitting}
                        />
                    </Elements>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading payment secure form...</div>
                )}
            </Form>

            <SocialAuthButtons mode="signup" />

            <div className="login-footer">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </AuthCard>
    );
}

export default Signup;

