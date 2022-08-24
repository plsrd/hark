import React, { useContext } from 'react';

import LogoutButton from './LogoutButton';
import UserContext from '../src/userContext';
import Avatar from './Avatar';
import TypesList from './TypesList';
import Link from 'next/link';
import ContentContext from '../src/contentContext';

const Nav = () => {
  const { user } = useContext(UserContext);
  const { setActiveDocument } = useContext(ContentContext);

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
        padding: '5px',
      }}
    >
      <Link href='/'>
        <a onClick={() => setActiveDocument()}>
          <img src='/letter-h.png' style={{ width: '50px' }} />
        </a>
      </Link>
      {user && (
        <>
          <Link href='/content'>
            <a onClick={() => setActiveDocument()}>dashboard</a>
          </Link>
          <TypesList />
          <div>
            <Avatar user={user} />
            <LogoutButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
