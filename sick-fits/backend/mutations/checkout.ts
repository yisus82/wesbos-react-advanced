import { KeystoneContext } from '@keystone-next/keystone/node_modules/@keystone-next/types/dist/declarations/src/core';
import {
  OrderCreateInput
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
import { Session } from '../types';

const graphql = String.raw;

interface CartItem {
  product: {
    price: number;
  };
  quantity: number;
}

const checkout = async (
  root: unknown,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput>  => {
  const session = context.session as Session;
  
  if (!session?.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  const user = await context.lists.User.findOne({
    where: { id: session.itemId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  });

  const amount = user.cart.reduce((total: number, item: CartItem) => item.product ? 
    total + item.quantity * item.product.price : total, 0);
  
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(error => {
    console.error(error);
    throw new Error(error.message);
  });

  console.log('charge :>> ', charge);

  return null;
}

export default checkout;