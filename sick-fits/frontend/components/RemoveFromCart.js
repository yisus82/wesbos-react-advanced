import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
      __typename
    }
  }
`;

const BigButtonStyles = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const update = (cache, payload) => {
  if (!payload?.data?.deleteCartItem) {
    return;
  }
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  const [deleteCartItem, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    optimisticResponse: {
      __typename: 'CartItem',
      id,
    },
  });

  return (
    <BigButtonStyles
      type="button"
      title="Remove from Cart"
      onClick={deleteCartItem}
      disabled={loading}
    >
      &times;
    </BigButtonStyles>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
