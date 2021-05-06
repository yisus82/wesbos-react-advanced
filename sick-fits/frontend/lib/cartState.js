import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  return (
    <LocalStateProvider value={{ isOpen, toggle, close, open }}>
      {children}
    </LocalStateProvider>
  );
};

CartStateProvider.propTypes = {
  children: PropTypes.node,
};

const useCart = () => useContext(LocalStateContext);

export { CartStateProvider, useCart };
