import PropTypes from 'prop-types';
import RequestResetPassword from '../components/RequestResetPassword';
import ResetPassword from '../components/ResetPassword';

const ResetPage = ({ query: { token } = {} }) => {
  if (!token) {
    return (
      <div>
        <p>Sorry, you have to supply a token</p>
        <RequestResetPassword />
      </div>
    );
  }

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
};

ResetPage.propTypes = {
  query: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResetPage;
