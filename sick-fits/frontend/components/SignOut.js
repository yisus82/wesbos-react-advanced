import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`;

const SignOut = () => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const router = useRouter();

  return (
    <a
      href="/signout"
      onClick={async (event) => {
        event.preventDefault();
        await signout();
        router.push({
          pathname: '/',
        });
      }}
    >
      Sign Out
    </a>
  );
};

export default SignOut;
