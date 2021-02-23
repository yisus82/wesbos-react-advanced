import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 800px) {
      font-size: 1rem;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: var(--lightGray);
      height: 100%;
      left: -5px;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    @media (min-width: 540px) {
      &:after {
        content: '';
        width: 0;
        background: red;
        height: 2px;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
    }
    @media (max-width: 540px) {
      &:after {
        content: '';
        width: 2px;
        background: var(--lightGray);
        height: 100%;
        left: calc(100% - 5px);
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
  @media (max-width: 540px) {
    border-top: 1px solid var(--lightGray);
  }
`;

export default NavStyles;
