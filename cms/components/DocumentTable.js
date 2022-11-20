import React, { useState, useContext } from 'react';
import contentContext from '../src/contentContext';
import updateContent from '../src/updateContent';

import DocumentOptionsMenu from './DocumentOptionsMenu';
import PostTableRow from './PostTableRow';
import ConfirmModal from './ConfirmModal';

const DocumentTable = ({ type, data }) => {
  const [openModal, setOpenModal] = useState(null);
  const [id, setId] = useState();
  const { setContent } = useContext(contentContext);

  const changeModal = (name, id) => {
    name == openModal ? setOpenModal(null) : setOpenModal(name);
    id ? setId(id) : null;
  };

  const updateSidebar = async () => await updateContent(setContent);

  const postHeaders = ['title', 'author', 'published'].map(header => (
    <th>{header}</th>
  ));

  return (
    <table className='table w-full'>
      <thead>
        <tr>
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
              {(() => {
                switch (type) {
                  case 'posts':
                    return <PostTableRow post={document} />;
                }
              })()}
              <th>
                <DocumentOptionsMenu
                  changeModal={changeModal}
                  id={document._id}
                  hideRevert
                />
              </th>
            </tr>
          ))}
        <ConfirmModal
          type='posts'
          id={id}
          {...{
            updateSidebar,
            openModal,
            changeModal,
          }}
        />
      </tbody>
    </table>
  );
};

export default DocumentTable;
