import React from 'react';

const EditorWrapper = ({ children, type }) => {
  return (
    <div className='w-9/12'>
      <div className='tab tab-lifted bg-base-200 border-b-0 text-base-content'>
        {`All ${type.slice(0, 1).toUpperCase() + type.slice(1)}`}
      </div>
      <div
        className='preview bg-base-200 rounded-b-box rounded-tr-box flex flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4'
        style={{
          backgroundImage:
            'radial-gradient(hsla(37 67% 58%/.2) 1px, hsla(270 4% 9%) 1px)',
          backgroundSize: '5px 5px',
          backgroundPosition: '-19px -19px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default EditorWrapper;
