import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../src/userContext';
import ContentContext from '../src/contentContext';
import client from '../src/client';

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const { setActiveDocument } = useContext(ContentContext);

  const router = useRouter();

  const handleClick = () => {
    client.logout();
    setUser();
    setActiveDocument();
    router.push('/');
  };

  return <button onClick={handleClick}> Log Out </button>;
};

export default LogoutButton;
