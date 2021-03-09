import PropTypes from 'prop-types';
import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query: { id } }) => (
  <div>
    <UpdateProduct id={id} />
  </div>
);

UpdatePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdatePage;
