import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';

const LogoStyles = styled.h1`
  background-color: var(--red, red);
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    color: var(--white, white);
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
    padding-left: 2rem;
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <LogoStyles>
        <Link href="/">Sick Fits</Link>
      </LogoStyles>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <Cart />
  </HeaderStyles>
);

export default Header;
