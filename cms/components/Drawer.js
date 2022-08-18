import React, { useContext } from 'react';
import UserContext from '../src/userContext';

const Drawer = () => {
  const { user } = useContext(UserContext);
  return (
    <>{!user ? <p>login to see content</p> : <p>look at all this content</p>}</>
  );
};

export default Drawer;
