import Link from 'next/link';
import React, { useContext } from 'react';
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-photo'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <line x1='15' y1='8' x2='15.01' y2='8'></line>
                <rect x='4' y='4' width='16' height='16' rx='3'></rect>
                <path d='M4 15l4 -4a3 5 0 0 1 3 0l5 5'></path>
                <path d='M14 14l1 -1a3 5 0 0 1 3 0l2 2'></path>
              </svg>
            </span>{' '}
            <span className='flex-1'>Media Library</span>{' '}
          </a>
        </li>
        <li>
          <a href='/docs/config' id='' className='flex gap-4   '>
            <span className='flex-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-users'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <circle cx='9' cy='7' r='4'></circle>
                <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                <path d='M21 21v-2a4 4 0 0 0 -3 -3.85'></path>
              </svg>
            </span>{' '}
            <span className='flex-1'>Users</span>{' '}
          </a>
        </li>
        <li>
          <a href='/docs/config' id='' className='flex gap-4   '>
            <span className='flex-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-settings'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z'></path>
                <circle cx='12' cy='12' r='3'></circle>
              </svg>
            </span>{' '}
            <span className='flex-1'>Site Settings</span>{' '}
          </a>
        </li>
      </ul>
      <ul className='menu menu-compact flex flex-col p-0 px-4'>
        <li></li>
        <li className='menu-title'>
          <span>Posts</span>
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
