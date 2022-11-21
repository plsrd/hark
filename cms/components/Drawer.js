import Link from 'next/link';
import React, { useContext } from 'react';
import { PhotoIcon, SettingsIcon, UsersIcon } from './icons';
import ContentContext from '../src/contentContext';
import DrawerHeader from './DrawerHeader';
import MenuHeader from './MenuHeader';
import MenuItemWithIcon from './MenuItemWithIcon';

const MenuListWrapper = ({ children }) => {
  return (
    <ul className='menu menu-compact flex flex-col p-0 px-4'>{children}</ul>
  );
};

const Drawer = ({ activeDocument }) => {
  const {
    content: { posts },
  } = useContext(ContentContext);

  return (
    <div className='w-80 overflow-y-auto'>
      <DrawerHeader />
      <div className='h-4'></div>
      <MenuListWrapper>
        <MenuItemWithIcon
          icon={<PhotoIcon />}
          name='Media Library'
          activeDocument={activeDocument}
        />
        <MenuItemWithIcon
          icon={<UsersIcon />}
          name='Users'
          activeDocument={activeDocument}
        />
        <MenuItemWithIcon
          icon={<SettingsIcon />}
          name='Settings'
          activeDocument={activeDocument}
        />
      </MenuListWrapper>
      <MenuListWrapper>
        <MenuHeader type='posts' />
        {posts &&
          posts.map(post => {
            return (
              <li key={post._id}>
                <Link href={`/content/posts/${post._id}`}>
                  <a className={activeDocument == post._id ? 'active' : ''}>
                    {post.title.length > 30
                      ? post.title.slice(0, 32) + '...'
                      : post.title}
                  </a>
                </Link>
              </li>
            );
          })}
      </MenuListWrapper>
    </div>
  );
};

export default Drawer;
