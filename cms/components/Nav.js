import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserContext from '../src/userContext';
import Avatar from './Avatar';
import TypesList from './TypesList';
import Link from 'next/link';
import ContentContext from '../src/contentContext';

const Nav = ({ children }) => {
  const { user } = useContext(UserContext);
  const { setActiveDocument } = useContext(ContentContext);

  return (
    <nav className='navbar w-full'>
      <div className='flex flex-1 md:gap-1 lg:gap-2'>
        {
          //TODO add search bar
        }
      </div>
      <div class='flex-none gap-2'>
        <div class='dropdown dropdown-end'>
          <label tabindex='0' class='btn btn-ghost btn-circle avatar'>
            <div class='w-8 rounded-full'>
              <img src='https://placeimg.com/80/80/people' />
            </div>
          </label>
          <ul
            tabindex='0'
            class='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <a class='justify-between'>Profile</a>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
