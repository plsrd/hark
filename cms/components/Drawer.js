import React from 'react';

const Drawer = () => {
  return (
    <div className='drawer-side w-80 '>
      <div className='p-5 z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex shadow-sm'>
        <a
          href='/'
          aria-current='page'
          aria-label='Homepage'
          class='flex-0 btn btn-ghost px-2'
        >
          <div class='font-metal text-primary inline-flex text-lg transition-all duration-200 md:text-5xl'>
            <span class='lowercase'>hark</span>
          </div>
        </a>
        <a
          href='/docs/changelog'
          class='link link-hover font-mono text-xs text-opacity-50'
        >
          <div data-tip='Changelog' class='tooltip tooltip-bottom'>
            0.0.1
          </div>
        </a>
      </div>
    </div>
  );
};

export default Drawer;
