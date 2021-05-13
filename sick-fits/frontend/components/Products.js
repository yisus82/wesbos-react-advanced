import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Products = ({ page = 1 }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <div>
      <ProductsListStyles>
        {data?.allProducts?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
};

Products.propTypes = {
  page: PropTypes.number,
};

export default Products;
