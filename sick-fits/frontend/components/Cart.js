import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import SupremeStyles from './styles/SupremeStyles';
import { useCurrentUser } from './User';

const Cart = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <CartStyles open>
      <header>
        <SupremeStyles>{currentUser.name}'s Cart</SupremeStyles>
      </header>
      <ul>
        {currentUser.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
