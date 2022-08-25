import React from 'react';
import { Controller } from 'react-hook-form';
import AuthorSelect from './AuthorSelect';
import RichTextEditor from './RichTextEditor';

const PostFields = ({ register, post, control }) => {
  return (
    <>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' {...register('title')} />
      </div>

      <div>
        <label htmlFor='author'>Author</label>
        <AuthorSelect register={register} />
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <Controller
          name='content'
          control={control}
          render={({ field }) => <RichTextEditor {...field} />}
        />
      </div>
    </>
  );
};

export default PostFields;
