import { useRouter } from 'next/router';
import React from 'react';
import client from '../src/client';
import slugify from 'slugify';

const ConfirmModal = ({
  type,
  id,
  data,
  updateSidebar,
  openModal,
  revertChanges,
  changeModal,
}) => {
  const router = useRouter();

  const handleClose = e => {
    e.preventDefault();
    changeModal(e.target.name, null);
  };

  const handleDelete = async () => {
    await client
      .delete(type, id)
      .then(async () => await updateSidebar())
      .then(() => {
        changeModal('delete', null);
        data
          ? router.push({
              pathname: '/content/[type]/[id]',
              query: { type, id: 'new' },
            })
          : router.push('/content/posts');
      });
  };

  const handleDuplicate = async e => {
    let originalDocument = data;

    if (!data)
      await client.get(type, id).then(({ data }) => (originalDocument = data));

    const title = 'Copy of ' + originalDocument.title;

    const document = {
      title,
      author: originalDocument.author._id,
      isPublished: originalDocument.isPublished,
      slug: slugify(title),
      content: originalDocument.content,
      image: originalDocument.image,
    };

    client.post(type, document).then(async res => {
      updateSidebar();
      changeModal(e.target.name, null);

      data
        ? router.push(
            {
              pathname: '/content/[type]/[id]',
              query: { type, id: res.data._id },
            },
            `/content/${type}/${res.data._id}`
          )
        : router.push('/content/posts');
    });
  };

  const handleClick = async e => {
    e.preventDefault();

    switch (openModal) {
      case 'delete':
        handleDelete();
        break;
      case 'duplicate':
        handleDuplicate(e);
        break;
      case 'revert':
        revertChanges();
        break;
      default:
        return;
    }
  };

  return (
    <div className={`modal ${openModal ? 'modal-open' : ''}`}>
      <div className='modal-box relative flex flex-col'>
        <button
          name={openModal}
          onClick={handleClose}
          className='btn btn-sm btn-circle absolute right-4 top-4'
        >
          ✕
        </button>
        <h3 className='text-lg font-bold'>
          {!openModal
            ? null
            : openModal == 'revert'
            ? 'Undo all unsaved changes?'
            : `${
                openModal.slice(0, 1).toUpperCase() + openModal.slice(1)
              } document?`}
        </h3>
        <div className='self-end flex gap-2 my-8'>
          <button
            name={openModal}
            className='btn btn-error'
            onClick={handleClick}
          >
            Confirm
          </button>
          <button
            name={openModal}
            onClick={handleClose}
            className='btn btn-primary'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
