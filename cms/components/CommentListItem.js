import React from 'react';

const CommentListItem = ({ comment }) => {
  const {
    author: { fullName },
    post: { title },
  } = comment;

  return (
    <div>
      <p>{title}</p>
      <p>{fullName}</p>
    </div>
  );
};

export default CommentListItem;
