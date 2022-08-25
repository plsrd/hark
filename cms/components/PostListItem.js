import React from 'react';
import { format } from 'date-fns';

const PostListItem = ({ post }) => {
  const { title, fullName, createdAt } = post;

  return (
    <div>
      <p>{title}</p>
      <p>{fullName}</p>
      <p>{format(new Date(createdAt), 'MMM d yyyy')}</p>
    </div>
  );
};

export default PostListItem;
