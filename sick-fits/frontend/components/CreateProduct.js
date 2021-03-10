import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import FormStyles from './styles/FormStyles';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $image: Upload!
    $name: String!
    $price: Int!
    $description: String!
  ) {
    createProduct(
      data: {
        photo: { create: { image: $image, altText: $description } }
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const CreateProduct = () => {
  const { inputValues, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  });

  const [createProduct, { error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputValues,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createProduct();
    clearForm();
    router.push({
      pathname: `/products/${res.data.createProduct.id}`,
    });
  };

  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
};

export default CreateProduct;
