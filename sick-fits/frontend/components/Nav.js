import Link from 'next/link';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useCurrentUser } from './User';

const Nav = () => {
  const user = useCurrentUser();
  const cart = useCart();

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
