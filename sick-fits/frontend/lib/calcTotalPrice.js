const calcTotalPrice = (cart) =>
  cart.reduce(
    (total, cartItem) =>
      !cartItem.product
        ? total
        : total + cartItem.quantity * cartItem.product.price,
    0
  );

export default calcTotalPrice;
