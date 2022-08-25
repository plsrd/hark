import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import { format } from 'date-fns';
import Link from 'next/link';
import PostListItem from './PostListItem';
import UserListItem from './UserListItem';
import ImageListItem from './ImageListItem';
import CommentListItem from './CommentListItem';

const ListComponents = () => {
  const { content, activeDocument, setActiveDocument } =
    useContext(ContentContext);

  return (
    <ul>
      <li>
        {' '}
        <Link href={`/content/${activeDocument?.type}/new`}>
          <a>Create new</a>
        </Link>
      </li>
      {content[activeDocument?.type] &&
        content[activeDocument.type].map(document => (
          <li key={document._id} style={{ borderBottom: '1px solid black' }}>
            <Link href={`/content/${activeDocument?.type}/${document._id}`}>
              <a
                onClick={() =>
                  setActiveDocument({ ...activeDocument, id: document._id })
                }
              >
                {(() => {
                  switch (activeDocument.type) {
                    case 'posts':
                      return <PostListItem post={document} />;
                    case 'users':
                      return <UserListItem user={document} />;
                    case 'images':
                      return <ImageListItem image={document} />;
                    case 'comments':
                      return <CommentListItem comment={document} />;
                    default:
                      return null;
                  }
                })()}
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default ListComponents;
