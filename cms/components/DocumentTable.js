import Link from 'next/link';
import React from 'react';
import { EditIcon } from '../components/icons';
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
                <Link href='/'>
                  <a>
                    <button className='btn btn-secondary'>
                      <EditIcon />
                    </button>
                  </a>
                </Link>
              </th>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
