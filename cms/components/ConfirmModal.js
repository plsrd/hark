import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import client from '../src/client';
import ContentContext from '../src/contentContext';

const ConfirmModal = ({
  type,
  id,
  data,
  updateSidebar,
  openModal,
  revertChanges,
  changeModal,
}) => {
  const { setContext } = useContext(ContentContext);
  const router = useRouter();

  const handleClose = e => {
    e.preventDefault();
    changeModal(e.target.name);
  };

  const handleDelete = async () => {
    await client
      .delete(type, id)
      .then(async () => await updateSidebar())
      .then(() => {
        changeModal('delete');
        router.push({
          pathname: '/content/[type]/[id]',
          query: { type, id: 'new' },
        });
      });
  };

  const handleDuplicate = async e => {
    const document = {
      title: 'Copy of ' + data.title,
      author: data.author._id,
      isPublished: data.isPublished,
      slug: data.slug,
      content: data.content,
    };

    await client.post(type, document).then(async res => {
      await updateSidebar();
      changeModal(e.target.name);
      router.push(
        {
          pathname: '/content/[type]/[id]',
          query: { type, id: res.data._id },
        },
        `/content/${type}/${res.data._id}`
      );
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
