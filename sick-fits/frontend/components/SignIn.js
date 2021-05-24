import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const [error, setError] = useState(undefined);

  const { inputValues, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputValues,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await signin();
    if (
      res.data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordFailure'
    ) {
      setError(res.data.authenticateUserWithPassword);
    } else {
      setError(undefined);
      resetForm();
      router.push({
        pathname: '/',
      });
    }
  };

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
            placeholder="Enter your current password"
            autoComplete="current-password"
            minLength="8"
            required
            value={inputValues.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </FormStyles>
  );
};

export default SignIn;
