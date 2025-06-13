import React, { useState } from 'react';
import TopBar from '../../../components/TopBar';
import visa from '../../../assets/visa.png';
import master from '../../../assets/master.png';
import { Input } from 'antd';
import Footer from '../../../components/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch('http://localhost:4000/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000, email }) 
      });
      const { clientSecret } = await response.json();
      console.log(clientSecret);
      // pamet confirmation
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        }
      });

      console.log(email);

    if (error) {
      setPaymentStatus(`Error: ${error.message}`);
      return;
    }

    setPaymentStatus('Payment successful!');
  };

  return (
    <section>
      <div className='bg-gray-200 p-6 rounded-xl'>
        <h1 className='text-[22px] font-[700]'>Payment Option</h1>
        <div className='flex max-md:flex-col justify-between'>
          <div className='flex gap-2 items-center'>
            <input type="radio" />
            <div>
              <p className='text-primary1 text-[16px] font-[700]'>Credit Card</p>
              <p className='text-black -mt-[4px] text-[14px] font-[400]'>Secure Online Payment For Bank</p>
            </div>
          </div>
          <div className="flex gap-2">
            <img src={visa} alt="" />
            <img src={master} alt="" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2 mt-6 ">
            <div>
              <h1 className='text-[12px] text-gray-700 font-[500]'>Full Name</h1>
              <Input className='border w-full rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter Name' />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <div>
              <h1 className='text-[12px] text-gray-700 font-[500]'>Email</h1>
              <Input className='border w-full rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter Email' />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-2 '>
            <div>
              <h1 className='text-[12px] text-gray-700 font-[500]'>Card Number</h1>
              <CardNumberElement className='border w-full rounded-xl py-[10px] pl-4 mt-[4px]'  placeholder='Enter Number' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <h1 className='text-[12px] text-gray-700 font-[500]'>Expiration</h1>
                <CardExpiryElement className='border w-full rounded-xl py-[10px] pl-4 mt-[4px]'  placeholder='MM / YY' />
              </div>
              <div>
                <h1 className='text-[12px] text-gray-700 font-[500]'>CVV</h1>
                <CardCvcElement className='border w-full rounded-xl py-[10px] pl-4 mt-[4px]'  placeholder='CVC' />
              </div>
            </div>
          </div>

        
          <button type="submit" className="bg-blue-500 text-white rounded-xl p-2 mt-4">Pay Now</button>
          <p>{paymentStatus}</p>
        </form>
      </div>
    </section>
  );
}


function PaymentFormWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default PaymentFormWrapper;
