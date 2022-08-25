import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import { format } from 'date-fns';
import Link from 'next/link';
import PostListItem from './PostListItem';

const ListComponents = () => {
  const { content, activeDocument, setActiveDocument } =
    useContext(ContentContext);

  return (
    <ul>
      {content[activeDocument?.type] &&
        content[activeDocument.type].map(document => (
          <li key={document._id} style={{ borderBottom: '1px solid black' }}>
            <Link href={`/content/${activeDocument?.type}/${document._id}`}>
              <a>Create new</a>
            </Link>
            <Link href={`/content/${activeDocument?.type}/${document._id}`}>
              <a
                onClick={() =>
                  setActiveDocument({ ...activeDocument, id: document._id })
                }
              >
                {(() => {
                  switch (activeDocument.type) {
                    case 'posts':
                      return <PostListItem document={document} />;
                    case 'users':
                      return (
                        <>
                          <p>{document.fullName}</p>
                          <p>{document.role}</p>
                        </>
                      );
                    case 'images':
                      return (
                        <>
                          <p>{document._id}</p>
                        </>
                      );
                    case 'comments':
                      <>
                        <p>{document.author.fullName} on</p>
                        <p>{document.post.title}</p>
                      </>;
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
