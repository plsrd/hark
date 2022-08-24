import React from 'react';
import AuthorSelect from './AuthorSelect';

const PostFields = ({ register, post }) => {
  return (
    <>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' {...register('title')} defaultValue={post.title} />
      </div>

      <div>
        <label htmlFor='author'>Author</label>
        <AuthorSelect register={register} defaultValue={post.author._id} />
      </div>
    </>
  );
};

export default PostFields;
