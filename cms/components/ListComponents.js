import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import { format } from 'date-fns';
import Link from 'next/link';

const ListComponents = () => {
  const { content, activeDocument, setActiveDocument } =
    useContext(ContentContext);

  console.log(content[activeDocument?.type]);

  return (
    <ul>
      {content[activeDocument?.type] &&
        content[activeDocument.type].map(document => (
          <li key={document._id}>
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
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default ListComponents;
