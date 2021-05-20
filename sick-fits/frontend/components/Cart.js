import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import formatMoney from '../lib/formatMoney';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartStyles from './styles/CartStyles';
import CloseButtonStyles from './styles/CloseButtonStyles';
import SupremeStyles from './styles/SupremeStyles';
import { useCurrentUser } from './User';

const Cart = () => {
  const currentUser = useCurrentUser();
  const cart = useCart();

  if (!currentUser) {
    return null;
  }

  return (
    <CartStyles open={cart.isOpen}>
      <header>
        <SupremeStyles>{currentUser.name}'s Cart</SupremeStyles>
        <CloseButtonStyles type="button" onClick={cart.close}>
          &times;
        </CloseButtonStyles>
      </header>
      <ul>
        {currentUser.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>Total: {formatMoney(calcTotalPrice(currentUser.cart))}</p>
      </footer>
      <Checkout />
    </CartStyles>
  );
};

export default Cart;
