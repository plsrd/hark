import React from 'react';

const ImageListItem = ({ image }) => {
  const { _id } = image;

  return (
    <div>
      <p>{_id}</p>
    </div>
  );
};

export default ImageListItem;
