import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { inputValues, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [signup, { data, loading, error: signupError }] = useMutation(
    SIGNUP_MUTATION,
    {
      variables: inputValues,
    }
  );

  const [formError, setFormError] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(undefined);
    if (inputValues.password !== inputValues.confirmPassword) {
      setFormError({ message: "Passwords don't match" });
      return;
    }
    await signup()
      .then(resetForm)
      .catch(() => {});
  };

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={signupError || formError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            autoComplete="name"
            required
            value={inputValues.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            value={inputValues.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            required
            value={inputValues.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            autoComplete="new-password"
            required
            value={inputValues.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </FormStyles>
  );
};

export default SignUp;
