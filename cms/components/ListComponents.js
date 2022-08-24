import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import { format } from 'date-fns';
import Link from 'next/link';

const ListComponents = () => {
  const { content, activeDocument, setActiveDocument } =
    useContext(ContentContext);

  return (
    <ul>
      {content[activeDocument?.type] &&
        content[activeDocument.type].map(document => (
          <li key={document._id} style={{ borderBottom: '1px solid black' }}>
            <Link href={`/content/${activeDocument?.type}/${document._id}`}>
              <a
                onClick={() =>
                  setActiveDocument({ ...activeDocument, id: document._id })
                }
              >
                {' '}
                {activeDocument.type == 'posts' && (
                  <>
                    <p>{document.title}</p>
                    <p>{document.fullName}</p>
                    <p>{format(new Date(document.createdAt), 'MMM d yyyy')}</p>
                  </>
                )}
                {activeDocument.type == 'users' && (
                  <>
                    <p>{document.fullName}</p>
                    <p>{document.role}</p>
                  </>
                )}
                {activeDocument.type == 'images' && (
                  <>
                    <p>{document._id}</p>
                  </>
                )}
                {activeDocument.type == 'comments' && (
                  <>
                    <p>{document.author.fullName} on</p>
                    <p>{document.post.title}</p>
                  </>
                )}
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default ListComponents;
