import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const ResetPassword = ({ token }) => {
  const { inputValues, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [resetPassword, { data, error: resetError, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: { ...inputValues, token },
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
    await resetPassword();
    resetForm();
  };

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : formError || resetError;

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in with your new password</p>
        )}
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
            minLength="8"
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
            minLength="8"
            required
            value={inputValues.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Password!</button>
      </fieldset>
    </FormStyles>
  );
};

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ResetPassword;
