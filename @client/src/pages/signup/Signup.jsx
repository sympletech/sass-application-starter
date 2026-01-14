import { useState, useEffect } from 'react';
import { Form, Input, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSearchParams } from 'react-router-dom';

import AuthCard from '@client/components/auth/AuthCard.jsx';
import AuthHeader from '@client/components/auth/AuthHeader.jsx';
import SocialAuthButtons from '@client/components/auth/SocialAuthButtons.jsx';
import PaymentForm from '@client/components/auth/PaymentForm.jsx';
import { postData, getData } from '@client/lib/use-api.js';

import './Signup.css';

function Signup() {
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailParam = searchParams.get('email');
    const firstNameParam = searchParams.get('firstName');
    const lastNameParam = searchParams.get('lastName');
    const isSocialSignup = searchParams.get('social') === 'true';

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

        // Auto-fill form fields from URL parameters
        const formValues = {};
        if (emailParam) formValues.email = emailParam;
        if (firstNameParam) formValues.firstName = firstNameParam;
        if (lastNameParam) formValues.lastName = lastNameParam;
        
        if (Object.keys(formValues).length > 0) {
            form.setFieldsValue(formValues);
        }
    }, [emailParam, firstNameParam, lastNameParam, form]);

    const handleSignup = async (paymentMethodId) => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);

            // If social signup, we might not have a password
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

            const result = await postData('/auth/signup', signupData);

            if (result.success) {
                message.success(result.message);
                // Redirect to dashboard
                window.location.href = '/@';
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
                title={isSocialSignup ? "Complete Your Registration" : "Start Your Free Trial"}
                subtitle={isSocialSignup ? "Just one more step to start your 14-day trial" : "14 days of full access, no strings attached"}
            />

            {!isSocialSignup && (
                <>
                    <SocialAuthButtons mode="signup" showDivider={false} />
                    <Divider plain>OR</Divider>
                </>
            )}

            <Form
                form={form}
                name="signup"
                layout="vertical"
                requiredMark={false}
                initialValues={{ email: emailParam }}
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        { required: true, message: 'Please input your first name!' }
                    ]}
                >
                    <Input
                        placeholder="Enter your first name"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        { required: true, message: 'Please input your last name!' }
                    ]}
                >
                    <Input
                        placeholder="Enter your last name"
                        size="large"
                    />
                </Form.Item>

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
                        disabled={isSocialSignup}
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
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        const hasUpperCase = /[A-Z]/.test(value);
                                        const hasLowerCase = /[a-z]/.test(value);
                                        const hasNumber = /[0-9]/.test(value);
                                        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
                                        
                                        if (!hasUpperCase) {
                                            return Promise.reject(new Error('Password must contain at least one uppercase letter!'));
                                        }
                                        if (!hasLowerCase) {
                                            return Promise.reject(new Error('Password must contain at least one lowercase letter!'));
                                        }
                                        if (!hasNumber) {
                                            return Promise.reject(new Error('Password must contain at least one number!'));
                                        }
                                        if (!hasSpecialChar) {
                                            return Promise.reject(new Error('Password must contain at least one special character!'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Create a password"
                                size="large"
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
                                prefix={<LockOutlined />}
                                placeholder="Confirm your password"
                                size="large"
                            />
                        </Form.Item>
                    </>
                )}

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

            <div className="login-footer">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </AuthCard>
    );
}

export default Signup;


