import React, { useContext } from 'react';
import UserContext from '../src/userContext';
import client from '../src/client';

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);

  const handleClick = () => {
    client.logout();
    setUser();
  };

  return <button onClick={handleClick}> Log Out </button>;
};

export default LogoutButton;
