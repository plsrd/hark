import React from 'react';
import { format } from 'date-fns';

const PostListItem = ({ document }) => {
  const { title, fullName, createdAt } = document;

  return (
    <div>
      <p>{title}</p>
      <p>{fullName}</p>
      <p>{format(new Date(createdAt), 'MMM d yyyy')}</p>
    </div>
  );
};

export default PostListItem;
