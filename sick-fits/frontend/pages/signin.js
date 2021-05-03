import styled from 'styled-components';
import RequestResetPassword from '../components/RequestResetPassword';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInPage = () => (
  <GridStyles>
    <SignIn />
    <SignUp />
    <RequestResetPassword />
  </GridStyles>
);

export default SignInPage;
