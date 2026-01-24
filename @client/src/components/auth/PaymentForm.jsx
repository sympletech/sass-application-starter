import { useState } from 'react';
import PropTypes from 'prop-types';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';

function PaymentForm({ onPaymentMethodCreated, loading }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isStripeLoaded, setIsStripeLoaded] = useState(false);

    const handleSubmit = async () => {
        if (!stripe || !elements) return;

        const { error, setupIntent } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // No return_url needed if we handle the result manually for SetupIntents
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
        <div className="w-full">
            <PaymentElement onReady={() => setIsStripeLoaded(true)} />
            <Button
                type="primary"
                size="large"
                block
                onClick={handleSubmit}
                loading={loading}
                disabled={!isStripeLoaded}
                className="mt-6 h-12 rounded-lg premium-button-primary border-none text-base"
            >
                Start Free Trial
            </Button>
        </div>
    );
}

PaymentForm.propTypes = {
    onPaymentMethodCreated: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

PaymentForm.defaultProps = {
    loading: false,
};

export default PaymentForm;
