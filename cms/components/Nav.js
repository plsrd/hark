import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserContext from '../src/userContext';
import Avatar from './Avatar';
import List from './List';
import Link from 'next/link';

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRight: '1px solid grey',
        boxSizing: 'border-box',
        height: '100%',
        width: '80px',
        padding: '5px'      
      }}
    >
      <Link href='/'>
        <a><img src='letter-h.png' style={{width: '50px'}}/></a>
      </Link>
    { 
      user &&
      <>
        <List />
        <div>
          <Avatar user={user} />
          <LogoutButton />
        </div>
      </>
    }
    </nav>
  );
};

export default Nav;
