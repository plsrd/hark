import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

const PostListComponent = ({ post }) => {
  const {
    _id,
    title,
    author: { fullName },
    createdAt,
  } = post;
  return (
    <li key={_id}>
      <Link href={`/posts/${_id}`}>
        <a>
          <p>{title}</p>
          <p>{fullName}</p>
          <p>{format(new Date(createdAt), 'MMM d yyyy')}</p>
        </a>
      </Link>
    </li>
  );
};

export default PostListComponent;
