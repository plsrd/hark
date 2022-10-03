import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import client from '../src/client';
import ContentContext from '../src/contentContext';
import updateContent from '../src/updateContent';

const DuplicateModal = ({ type, id, data, updateSidebar }) => {
  const { setContext } = useContext(ContentContext);
  const router = useRouter();

  const handleClick = async e => {
    e.preventDefault();

    const document = {
      title: data.title,
      author: data.author._id,
      isPublished: data.isPublished,
      slug: data.slug,
      content: data.content,
    };

    await client.post(type, document).then(async res => {
      await updateSidebar();

      console.log(res);

      // router.push(
      //   {
      //     pathname: '/content/[type]/[id]',
      //     query: { type, id: res.data._id },
      //   },
      //   `/content/${type}/${res.data._id}`
      // );
    });
  };

  return (
    <>
      <input type='checkbox' id='duplicateModal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative flex flex-col'>
          <label
            htmlFor='duplicateModal'
            className='btn btn-sm btn-circle absolute right-4 top-4'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Duplicate document?</h3>
          <div className='self-end flex gap-2 my-8'>
            <button className='btn btn-error' onClick={handleClick}>
              Confirm
            </button>
            <label htmlFor='duplicateModal' className='btn btn-primary'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuplicateModal;
