import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsIndexPage = () => {
  const { query: { page = 1 } = {} } = useRouter();

  return (
    <div>
      <Pagination page={+page} />
      <Products />
      <Pagination page={+page} />
    </div>
  );
};

export default ProductsIndexPage;
