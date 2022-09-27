import { useRouter } from 'next/router';
import React from 'react';
import client from '../src/client';

const DeteleModal = ({ type, id }) => {
  const router = useRouter();
  const handleDeleteClick = async () => {
    await client.delete(type, id).then(() => router.push(`/${type}/new`));
  };

  return (
    <>
      <input type='checkbox' id='deleteModal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative flex flex-col'>
          <label
            htmlFor='deleteModal'
            className='btn btn-sm btn-circle absolute right-4 top-4'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Delete document?</h3>
          <div className='self-end flex gap-2 my-8'>
            <button className='btn btn-error' onClick={handleDeleteClick}>
              Confirm
            </button>
            <label htmlFor='deleteModal' className='btn btn-primary'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeteleModal;
