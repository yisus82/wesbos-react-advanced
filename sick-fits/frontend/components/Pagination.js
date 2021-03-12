import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

const COUNT_PRODUCTS_QUERY = gql`
  query COUNT_PRODUCTS_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page = 1 }) => {
  const { data, error, loading } = useQuery(COUNT_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  const { count } = data._allProductsMeta;
  const totalPages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {totalPages}
        </title>
      </Head>
      <Link href={`products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p>{count} items total</p>
      <Link href={`products/${page + 1}`}>
        <a aria-disabled={page >= totalPages}>Next →</a>
      </Link>
    </PaginationStyles>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
};

export default Pagination;
