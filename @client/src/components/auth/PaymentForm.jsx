import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';

function PaymentForm({ onPaymentMethodCreated, loading }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isStripeLoaded, setIsStripeLoaded] = useState(false);

    const handleSubmit = async (event) => {
        if (!stripe || !elements) return;

        const { error, setupIntent } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // No return_url needed if we handle the result manually for SetupIntents
                // but Stripe sometimes requires it. We'll handle success/error here.
            },
            redirect: 'if_required'
        });

        if (error) {
            message.error(error.message);
        } else if (setupIntent && setupIntent.status === 'succeeded') {
            onPaymentMethodCreated(setupIntent.payment_method);
        }
    };

    return (
        <div className="payment-form-container">
            <PaymentElement onReady={() => setIsStripeLoaded(true)} />
            <Button
                type="primary"
                size="large"
                block
                onClick={handleSubmit}
                loading={loading}
                disabled={!isStripeLoaded}
                style={{ marginTop: '24px' }}
            >
                Start Free Trial
            </Button>
        </div>
    );
}

export default PaymentForm;
