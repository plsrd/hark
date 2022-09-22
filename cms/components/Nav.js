import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserContext from '../src/userContext';
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
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-8 rounded-full'>
              <img src='https://placeimg.com/80/80/people' />
            </div>
          </label>
          <ul
            tabIndex='0'
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <a className='justify-between'>Profile</a>
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
