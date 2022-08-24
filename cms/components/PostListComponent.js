import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import { format } from 'date-fns';
import Link from 'next/link';

const PostListComponents = () => {
  const {
    content: { posts },
    activeDocument,
    setActiveDocument,
  } = useContext(ContentContext);

  return (
    <ul>
      {posts &&
        posts.map(post => (
          <li key={post._id}>
            <Link href={`/content/posts/${post._id}`}>
              <a
                onClick={() =>
                  setActiveDocument({ ...activeDocument, id: post._id })
                }
              >
                <p>{post.title}</p>
                <p>{post.fullName}</p>
                <p>{format(new Date(post.createdAt), 'MMM d yyyy')}</p>
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default PostListComponents;
