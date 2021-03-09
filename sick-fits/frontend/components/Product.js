import Link from 'next/link';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import PriceTagStyles from './styles/PriceTagStyles';
import TitleStyles from './styles/TitleStyles';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product.photo?.image?.publicUrlTransformed} alt={product.name} />
    <TitleStyles>
      <Link href={`/products/${product.id}`}>{product.name}</Link>
    </TitleStyles>
    <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
    <p>{product.description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: {
            id: product.id,
          },
        }}
      >
        Edit ✏️
      </Link>
    </div>
  </ItemStyles>
);

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string.isRequired,
      }),
    }),
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
