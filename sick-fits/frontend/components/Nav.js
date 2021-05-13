import Link from 'next/link';
import { useMemo } from 'react';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useCurrentUser } from './User';

const Nav = () => {
  const user = useCurrentUser();
  const cart = useCart();

  const cartItems = useMemo(
    () => user?.cart?.reduce((total, item) => total + item.quantity, 0),
    [user?.cart]
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={cart.open}>
            My Cart
            <CartCount count={cartItems} />
          </button>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
