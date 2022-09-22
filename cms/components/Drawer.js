import Link from 'next/link';
import React, { useContext } from 'react';
import {
  EditIcon,
  OptionsIcon,
  PhotoIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from '../icons';
import ContentContext from '../src/contentContext';

const Drawer = () => {
  const { content } = useContext(ContentContext);

  return (
    <div className='w-80 overflow-y-auto'>
      <div className='h-fit z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 gap-2 px-4 py-2 hidden lg:flex shadow-sm'>
        <a
          href='/'
          aria-current='page'
          aria-label='Homepage'
          className='flex-0 btn btn-ghost px-2'
        >
          <div className='font-metal text-primary inline-flex text-lg transition-all duration-200 md:text-5xl'>
            <span className='lowercase'>hark</span>
          </div>
        </a>
        <a
          href='/docs/changelog'
          className='link link-hover font-mono text-xs text-opacity-50 self-end mb-2'
        >
          <div data-tip='Changelog' className='tooltip tooltip-bottom'>
            0.0.1
          </div>
        </a>
      </div>
      <div className='h-4'></div>
      <ul className='menu menu-compact flex flex-col p-0 px-4'>
        <li>
          <a href='/docs/config' id='' className='flex gap-4   '>
            <span className='flex-none'>
              <PhotoIcon />
            </span>{' '}
            <span className='flex-1'>Media Library</span>{' '}
          </a>
        </li>
        <li>
          <a href='/docs/config' id='' className='flex gap-4   '>
            <span className='flex-none'>
              <UsersIcon />
            </span>{' '}
            <span className='flex-1'>Users</span>{' '}
          </a>
        </li>
        <li>
          <a href='/docs/config' id='' className='flex gap-4   '>
            <span className='flex-none'>
              <SettingsIcon />
            </span>{' '}
            <span className='flex-1'>Site Settings</span>{' '}
          </a>
        </li>
      </ul>
      <ul className='menu menu-compact flex flex-col p-0 px-4'>
        <li></li>
        <li className='menu-title flex flex-row justify-between items-center'>
          <span className='text-sm uppercase'>Posts</span>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-xs'>
              <OptionsIcon size={16} />
            </label>
            <ul
              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48'
              tabIndex={0}
            >
              <li>
                <Link href='/content/posts'>
                  <a>
                    <EditIcon size={16} />
                    <span className='font-normal text-neutral-content'>
                      Bulk Edit
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/content/posts/new'>
                  <a>
                    <PlusIcon size={16} />
                    <span className='font-normal text-neutral-content'>
                      Create New
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {content.posts.map(post => (
          <li key={post._id}>
            <Link href={`/content/post/${post._id}}`}>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className='menu menu-compact flex flex-col p-0 px-4'>
        <li></li>
        <li className='menu-title'>
          <span>Authors</span>
        </li>
        {content.authors.map(author => (
          <li key={author._id}>
            <Link href={`/content/user/${author._id}}`}>
              <span>{author.fullName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
