import { useEffect, useState } from 'react';

const useForm = (initialInputValues = {}) => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const initialValues = Object.values(initialInputValues).join(', ');

  useEffect(() => {
    setInputValues(initialInputValues);
  }, [initialValues]);

  const getInitialValue = (value) =>
    typeof value === 'number' ? 0 : Array.isArray(value) ? [] : '';

  const parseValue = (value, type, files) => {
    if (type === 'number') {
      const newValue = parseInt(value, 10);
      if (Number.isNaN(newValue)) {
        return '';
      }
      return newValue;
    }

    if (type === 'file') {
      return files[0];
    }

    return value;
  };

  const handleChange = (event) => {
    const { value, name, type, files } = event.target;

    setInputValues({
      ...inputValues,
      [name]: parseValue(value, type, files),
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
