import PropTypes from 'prop-types';
import SignIn from './SignIn';
import { useCurrentUser } from './User';

const PleaseSignIn = ({ children }) => {
  const me = useCurrentUser();

  if (!me) {
    return <SignIn />;
  }

  return children;
};

PleaseSignIn.propTypes = {
  children: PropTypes.node,
};

export default PleaseSignIn;
