import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserContext from '../src/userContext';

const Nav = ({ handleToggle }) => {
  const { user } = useContext(UserContext);

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 1rem',
        borderBottom: '1px solid grey',
        paddingBottom: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button onClick={handleToggle}>toggle</button>
        <h1>hark</h1>
      </div>

      {user && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <p>{user.firstName?.slice(0, 1) + user.lastName?.slice(0, 1)}</p>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Nav;
