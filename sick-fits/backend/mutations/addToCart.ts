import { KeystoneContext } from '@keystone-next/keystone/node_modules/@keystone-next/types/dist/declarations/src/core';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

const addToCart = async (
  root: unknown,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  const session = context.session as Session;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });
  const [existingCartItem] = allCartItems;

  if (existingCartItem) {
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 }
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: {connect: {id: session.itemId}},
      quantity: 1,
    }
  })
};

export default addToCart;
