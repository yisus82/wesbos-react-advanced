import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';

const CreateProduct = () => {
  const { inputValues, handleChange } = useForm({
    image: [''],
    name: '',
    price: 0,
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inputValues', inputValues);
  };

  return (
    <FormStyles onSubmit={handleSubmit}>
      <fieldset>
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
            value={inputValues.price}
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
