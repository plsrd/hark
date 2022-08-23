import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import UserContext from '../src/userContext';
import client from '../src/client';

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter()

  const handleClick = () => {
    client.logout();
    setUser();
    router.push('/')
  };

  return <button onClick={handleClick}> Log Out </button>;
};

export default LogoutButton;
