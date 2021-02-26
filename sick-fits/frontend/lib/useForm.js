import { useState } from 'react';

const useForm = (initialInputValues = {}) => {
  const [inputValues, setInputValues] = useState(initialInputValues);

  const getInitialValue = (value) =>
    typeof value === 'number' ? 0 : Array.isArray(value) ? [] : '';

  const handleChange = (event) => {
    const { value, name, type, files } = event.target;

    setInputValues({
      ...inputValues,
      [name]: type === 'number' ? +value : type === 'file' ? [...files] : value,
    });
  };

  const resetForm = () => setInputValues(initialInputValues);

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputValues).map(([key, value]) => [
        key,
        getInitialValue(value),
      ])
    );

    setInputValues(blankState);
  };

  return {
    inputValues,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
