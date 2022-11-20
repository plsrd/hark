import Link from 'next/link';
import React from 'react';

const Avatar = ({ image }) => {
  return (
    <div className='avatar'>
      <div className='mask mask-squircle w-12 h-12'>
        <img
          src={image ? image : '/postIcon.png'}
          alt='Avatar Tailwind CSS Component'
        />
      </div>
    </div>
  );
};

export default Avatar;
