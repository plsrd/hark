import React, { useState, useContext } from 'react';
import contentContext from '../src/contentContext';
import updateContent from '../src/updateContent';

import DocumentOptionsMenu from './DocumentOptionsMenu';
import PostTableRow from './PostTableRow';
import ConfirmModal from './ConfirmModal';

const DocumentTable = ({ data }) => {
  const [openModal, setOpenModal] = useState(null);
  const [id, setId] = useState();
  const { setContent } = useContext(contentContext);

  const changeModal = (name, id) => {
    name == openModal ? setOpenModal(null) : setOpenModal(name);
    id ? setId(id) : null;
  };

  const updateSidebar = async () => await updateContent(setContent);

  return (
    <>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(document => (
              <tr key={document._id}>
                <PostTableRow post={document} />
                <th>
                  <DocumentOptionsMenu
                    changeModal={changeModal}
                    id={document._id}
                    hideRevert
                  />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
      <ConfirmModal
        type='posts'
        id={id}
        {...{
          updateSidebar,
          openModal,
          changeModal,
        }}
      />
    </>
  );
};

export default DocumentTable;
