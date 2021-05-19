import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import SickButtonStyles from './styles/SickButtonStyles';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const Checkout = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Elements stripe={stripe}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButtonStyles>Check out now</SickButtonStyles>
      </CheckoutFormStyles>
    </Elements>
  );
};

export default Checkout;
