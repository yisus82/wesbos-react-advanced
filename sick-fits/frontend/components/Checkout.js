import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import DisplayError from './ErrorMessage';
import SickButtonStyles from './styles/SickButtonStyles';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCart();

  const handleSubmit = async (event) => {
    // Block native form submission
    event.preventDefault();

    // Disable form submission until Stripe.js has loaded
    if (!stripe || !elements) {
      return;
    }

    // Turn loader on
    setLoading(true);

    // Start page transition
    nProgress.start();

    // Clear previous error message (if existed)
    setError(undefined);

    // Elements knows how to find your CardElement because there can only ever be one of each type of element
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // Handle errors
    if (error) {
      setError(error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Close cart
      cart.close();
    }

    // Turn loader off
    setLoading(false);

    // Finish page transition
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <CardElement />
      <SickButtonStyles disabled={loading}>Check out now</SickButtonStyles>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
