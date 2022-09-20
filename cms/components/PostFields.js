import React from 'react';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import AuthorSelect from './AuthorSelect';
import RichTextEditor from './RichTextEditor';

const PostFields = ({ register, post, control, getValues, setValue }) => {
  const generateSlug = e => {
    e.preventDefault();
    const { title } = getValues();
    setValue('slug', slugify(title, { lower: true }));
  };

  return (
    <>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' {...register('title')} />
      </div>
      <div>
        <label htmlFor='slug'>Slug</label>
        <input type='text' {...register('slug')} />
        <button onClick={generateSlug}>Generate</button>
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
