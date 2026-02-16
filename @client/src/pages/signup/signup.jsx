import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Form, Input, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { postData, getData } from '@client/lib/use-api.js';
import { handleApiError } from '@client/lib/error-utils.js';

import AuthCard from '@client/components/auth/auth-card.jsx';
import AuthHeader from '@client/components/auth/auth-header.jsx';
import SocialAuthButtons from '@client/components/auth/social-auth-buttons.jsx';
import PaymentForm from '@client/components/auth/payment-form.jsx';

function Signup() {
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();
    const [stripeConfig, setStripeConfig] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const stripeConfigUpdate = await getData('/auth/init-stripe-form');
                const stripePromise = loadStripe(stripeConfigUpdate.publishableKey);
                setStripeConfig({
                    ...stripeConfigUpdate,
                    stripePromise
                });
            } catch (err) {
                handleApiError(err, 'Failed to initialize payment form. Please refresh the page and try again.');
            }
        })();
    }, []);

    const handleSignup = async (paymentMethodId) => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);

            const signupData = {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                paymentMethodId,
                isSocial: isSocialSignup
            };

            if (!isSocialSignup) {
                signupData.password = values.password;
            }

            const result = await postData('/account/signup', signupData);

            if (result.success) {
                message.success(result.message);
                window.location.href = '/@';
            }
        } catch (error) {
            handleApiError(error, 'Signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSocialSignup = searchParams.get('social') === 'true';
    const initialFormValues = isSocialSignup ? {
        firstName: searchParams.get('firstName') || '',
        lastName: searchParams.get('lastName') || '',
        email: searchParams.get('email') || ''
    } : {};

    return (
        <AuthCard>
            <AuthHeader
                title={isSocialSignup ? "Complete Your Registration" : "Start Your Free Trial"}
                subtitle={isSocialSignup ? "Just one more step to start your 14-day trial" : "14 days of full access, no strings attached"}
            />

            {!isSocialSignup && (
                <>
                    <SocialAuthButtons mode="signup" showDivider={false} />
                    <Divider plain className="text-text-faint text-xs my-8">OR</Divider>
                </>
            )}

            <Form
                form={form}
                name="signup"
                layout="vertical"
                requiredMark={false}
                initialValues={initialFormValues}
                autoComplete="off"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input placeholder="Enter first" size="large" className="rounded-lg h-12" />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input placeholder="Enter last" size="large" className="rounded-lg h-12" />
                    </Form.Item>
                </div>

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
                        disabled={isSocialSignup}
                        className="rounded-lg h-12"
                    />
                </Form.Item>

                {!isSocialSignup && (
                    <>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 8, message: 'Password must be at least 8 characters!' },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        const checks = [
                                            /[A-Z]/.test(value),
                                            /[a-z]/.test(value),
                                            /[0-9]/.test(value),
                                            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                                        ];
                                        if (checks.filter(Boolean).length < 4) {
                                            return Promise.reject(new Error('Password must contain uppercase, lowercase, number, and special character!'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-text-faint" />}
                                placeholder="Create a password"
                                size="large"
                                className="rounded-lg h-12"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-text-faint" />}
                                placeholder="Confirm your password"
                                size="large"
                                className="rounded-lg h-12"
                            />
                        </Form.Item>
                    </>
                )}

                <div className="mt-6 border-t border-surface-border pt-8">
                    {stripeConfig ? (
                        <Elements
                            stripe={stripeConfig.stripePromise}
                            options={{
                                clientSecret: stripeConfig.clientSecret
                            }}>
                            <PaymentForm
                                onPaymentMethodCreated={handleSignup}
                                loading={isSubmitting}
                            />
                        </Elements>
                    ) : (
                        <div className="text-center py-6 text-text-body bg-surface-muted rounded-xl">
                            Loading secure payment form...
                        </div>
                    )}
                </div>
            </Form>

            <div className="mt-10 text-center">
                <p className="text-text-muted text-sm">
                    Already have an account? <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </AuthCard>
    );
}

export default Signup;
