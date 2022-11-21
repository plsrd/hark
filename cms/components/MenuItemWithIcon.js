import Link from 'next/link';
import React from 'react';

const MenuItemWithIcon = ({ name, icon, activeDocument }) => {
  return (
    <li>
      <Link href={`/${name.toLowerCase().split(' ').join('-')}`}>
        <a className={`flex gap-4 ${activeDocument == name ? 'active' : ''}`}>
          <span className='flex-none'>{icon}</span>{' '}
          <span className='flex-1'>{name}</span>{' '}
        </a>
      </Link>
    </li>
  );
};

export default MenuItemWithIcon;
