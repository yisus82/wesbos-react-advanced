import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsIndexPage = () => {
  const { query: { page = 1 } = {} } = useRouter();
  const currentPage = +page;

  return (
    <div>
      <Pagination page={currentPage} />
      <Products page={currentPage} />
      <Pagination page={currentPage} />
    </div>
  );
};

export default ProductsIndexPage;
