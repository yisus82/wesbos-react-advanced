import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const handleUpdate = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: handleUpdate,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this?')) {
          deleteProduct().catch((error) => alert(error.message));
        }
      }}
    >
      {children}
    </button>
  );
};

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default DeleteProduct;
