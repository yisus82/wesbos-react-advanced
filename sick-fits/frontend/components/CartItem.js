import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img
      width="100"
      src={cartItem.product.photo.image.publicUrlTransformed}
      alt={cartItem.product.description}
    />
    <div>
      <h3>{cartItem.product.name}</h3>
      <p>
        {formatMoney(cartItem.quantity * cartItem.product.price)} -{' '}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.product.price)} each
        </em>
      </p>
    </div>
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photo: PropTypes.shape({
        image: PropTypes.shape({
          publicUrlTransformed: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default CartItem;
