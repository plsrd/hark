import React from 'react';

const DrawerHeader = () => {
  return (
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
  );
};

export default DrawerHeader;
