import React from 'react';
import PostTableRow from './PostTableRow';

const DocumentTable = ({ type, data }) => {
  const postHeaders = ['title', 'author', 'published'].map(header => (
    <th>{header}</th>
  ));
  return (
    <table className='table w-full'>
      <thead>
        <tr>
          <th>
            <label>
              <input type='checkbox' className='checkbox' />
            </label>
          </th>
          {(() => {
            switch (type) {
              case 'posts':
                return postHeaders;
            }
          })()}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(document => (
            <tr key={document._id}>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              {(() => {
                switch (type) {
                  case 'posts':
                    return <PostTableRow post={document} />;
                }
              })()}
              <th>
                <button className='btn btn-accent'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-trash'
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
                    <line x1='4' y1='7' x2='20' y2='7'></line>
                    <line x1='10' y1='11' x2='10' y2='17'></line>
                    <line x1='14' y1='11' x2='14' y2='17'></line>
                    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12'></path>
                    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3'></path>
                  </svg>
                </button>
              </th>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
