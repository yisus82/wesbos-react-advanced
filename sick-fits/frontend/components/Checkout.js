import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import DisplayError from './ErrorMessage';
import SickButtonStyles from './styles/SickButtonStyles';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [checkout, { error: graphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCart();
  const router = useRouter();

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
      // Create order
      const order = await checkout({
        variables: {
          token: paymentMethod.id,
        },
      });
      // Redirect to order page
      router.push({
        pathname: `/order/[id]`,
        query: {
          id: order.data.checkout.id,
        },
      });
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
      <DisplayError error={error || graphqlError} />
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
