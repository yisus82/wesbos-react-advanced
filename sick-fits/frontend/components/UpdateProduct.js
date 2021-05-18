import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { SINGLE_PRODUCT_QUERY } from './SingleProduct';
import FormStyles from './styles/FormStyles';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const { inputValues, handleChange, clearForm } = useForm({
    name: queryData?.Product?.name || '',
    price: queryData?.Product?.price || 0,
    description: queryData?.Product?.description || '',
  });

  const [
    updateProduct,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      name: inputValues.name,
      price: inputValues.price,
      description: inputValues.description,
    },
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProduct();
    clearForm();
    router.push({
      pathname: `/product/${id}`,
    });
  };

  if (queryLoading) {
    return <p>Loading...</p>;
  }

  if (queryError) {
    return <DisplayError error={queryError} />;
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputValues.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputValues.price.toString()}
            onChange={handleChange}
            min={0}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            value={inputValues.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </FormStyles>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateProduct;
