import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query: { id } }) => <SingleProduct id={id} />;

SingleProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleProductPage;
