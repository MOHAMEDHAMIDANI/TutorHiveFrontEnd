import React, { useState } from 'react';
import { Modal, Form, message, Spin, Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axiosInstance from '../api/axiosInstance';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_URL);

const POINT_PACKAGES = [
  { value: 10, label: '50 Points', price: 10, discount: null },
  { value: 18, label: '100 Points', price: 18, discount: '10% OFF', popular: true },
  { value: 35, label: '200 Points', price: 35, discount: '12% OFF' },
  { value: 80, label: '500 Points', price: 80, discount: '15% OFF' },
];

const CheckoutForm = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || isProcessing || isLoading) return;

    setIsProcessing(true);
    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      // Create Payment Method with Stripe
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        message.error(`Payment Method Error: ${error.message}`);
        setIsProcessing(false);
        setIsLoading(false);
        return;
      }

      // Call your API to process the payment
      const response = await axiosInstance.post('transactions/topup', {
        paymentMethodId: paymentMethod.id,
        amount: selectedPackage,
      });

      if (response.data.success) {
        onSuccess();
        message.success('Payment successful!');
      } else {
        message.error('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      message.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Your Package</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {POINT_PACKAGES.map((pkg) => (
              <div
                key={pkg.value}
                onClick={() => setSelectedPackage(pkg.value)}
                style={{
                  border: pkg.value === selectedPackage ? '3px solid #007bff' : '3px solid #ddd',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: pkg.value === selectedPackage ? '#BFDCF8' : 'white',
                }}
              >
                <div className="flex gap-2 items-center">
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{pkg.label}</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>${pkg.price}</div>
                {pkg.discount && (
                  <div style={{ fontSize: '14px', color: 'green' }}>{pkg.discount}</div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Payment Information</h3>
          <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '16px' }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Total Amount: ${selectedPackage} </h3>

          <button
            type="submit"
            disabled={isProcessing || isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full text-blue-600 mt-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </Spin>
  );
};

const AddPointsModal = ({ open, handleCancel }) => {
  const handleSuccess = () => {
    handleCancel();
    message.success('Points added successfully!');
  };

  return (
    <Modal
      title="Add Points"
      visible={open}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      maskClosable={false}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </Elements>
    </Modal>
  );
};

export default AddPointsModal;
