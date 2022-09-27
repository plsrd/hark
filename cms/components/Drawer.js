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
    content: { posts, authors },
  } = useContext(ContentContext);

  return (
    <div className='w-80 overflow-y-auto'>
      <DrawerHeader />
      <div className='h-4'></div>
      <MenuListWrapper>
        <MenuItemWithIcon icon={<PhotoIcon />} name='Media Library' />
        <MenuItemWithIcon icon={<UsersIcon />} name='Users' />
        <MenuItemWithIcon icon={<SettingsIcon />} name='Settings' />
      </MenuListWrapper>
      <MenuListWrapper>
        <MenuHeader type='posts' />
        {posts.map(post => {
          return (
            <li key={post._id}>
              <Link href={`/content/posts/${post._id}`}>
                <a className={activeDocument == post._id ? 'active' : ''}>
                  {post.title}
                </a>
              </Link>
            </li>
          );
        })}
      </MenuListWrapper>
      <MenuListWrapper>
        <MenuHeader type='authors' />
        {authors.map(author => (
          <li key={author._id}>
            <Link href={`/content/authors/${author._id}`}>
              <a className={activeDocument == author._id ? 'active' : ''}>
                {author.fullName}
              </a>
            </Link>
          </li>
        ))}
      </MenuListWrapper>
    </div>
  );
};

export default Drawer;
