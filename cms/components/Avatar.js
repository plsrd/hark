import Link from 'next/link';
import React from 'react';

const Avatar = ({ image }) => {
  return (
    <div className='avatar'>
      <div className='mask mask-squircle w-12 h-12'>
        <img
          src={image ? image : 'https://placeimg.com/80/80/people'}
          alt='Avatar Tailwind CSS Component'
        />
      </div>
    </div>
  );
};

export default Avatar;
