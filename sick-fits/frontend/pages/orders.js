import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrdersStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItems = (order) =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const OrdersPage = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Sick Fits - Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders</h2>
      <OrdersStyles>
        {allOrders.map((order) => {
          const itemCount = countItems(order);
          const productCount = order.items.length;

          return (
            <OrderItemStyles key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>Order {order.id}</a>
              </Link>
              <div className="order-meta">
                <p>
                  {itemCount === 1 ? `${itemCount} Item` : `${itemCount} Items`}
                </p>
                <p>
                  {productCount === 1
                    ? `${productCount} Product`
                    : `${productCount} Products`}
                </p>
                <p>{formatMoney(order.total)}</p>
              </div>
              <div className="images">
                {order.items.map((item) => (
                  <img
                    key={`image-${item.id}`}
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.description}
                    title={item.description}
                  />
                ))}
              </div>
            </OrderItemStyles>
          );
        })}
      </OrdersStyles>
    </div>
  );
};

export default OrdersPage;
