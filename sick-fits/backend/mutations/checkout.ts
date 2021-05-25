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
  const cartItems = user.cart.filter(cartItem => cartItem.product);
  const amount = cartItems.reduce((total: number, cartItem: CartItem) => cartItem.product ? 
    total + cartItem.quantity * cartItem.product.price : total, 0);
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(error => {
    console.error(error);
    throw new Error(error.message);
  });
  const orderItems = cartItems.map(cartItem => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: session.itemId }}
    },
    resolveFields: false,
  });
  const cartItemIds = cartItems.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });
  return order;
}

export default checkout;