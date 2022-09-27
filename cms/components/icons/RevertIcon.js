import React from 'react';

export const RevertIcon = ({ size = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler arrow-back-up'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1'></path>
    </svg>
  );
};
