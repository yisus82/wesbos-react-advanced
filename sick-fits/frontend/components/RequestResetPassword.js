import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const REQUEST_RESET_PASSWORD_MUTATION = gql`
  mutation REQUEST_RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestResetPassword = () => {
  const { inputValues, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestResetPassword, { data, loading }] = useMutation(
    REQUEST_RESET_PASSWORD_MUTATION,
    {
      variables: inputValues,
    }
  );

  const [email, setEmail] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await requestResetPassword();
    setEmail(inputValues.email);
    resetForm();
  };

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Request A Password Reset</h2>
      <DisplayError error={data?.sendUserPasswordResetLink} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && email && (
          <p>
            Requested a password reset for {email} - Please go ahead and check
            your email!
          </p>
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </FormStyles>
  );
};

export default RequestResetPassword;
