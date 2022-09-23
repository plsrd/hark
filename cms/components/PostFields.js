import React from 'react';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import AuthorSelect from './AuthorSelect';
import RichTextEditor from './RichTextEditor';

const FormInputWrapper = ({ children }) => {
  return <div className='flex flex-col gap-3'>{children}</div>;
};

const PostFields = ({ register, post, control, getValues, setValue }) => {
  const generateSlug = e => {
    e.preventDefault();
    const { title } = getValues();
    setValue('slug', slugify(title, { lower: true }));
  };

  return (
    <>
      <FormInputWrapper>
        <label htmlFor='title' className='text-lg'>
          Title
        </label>
        <input
          type='text'
          {...register('title')}
          className='input input-bordered text-white'
        />
      </FormInputWrapper>
      <FormInputWrapper>
        <label htmlFor='slug' className='text-lg'>
          Slug
        </label>
        <div className='input-group'>
          <input
            type='text'
            {...register('slug')}
            className='input w-full input-bordered text-white'
          />
          <button onClick={generateSlug} className='btn btn-primary'>
            Generate
          </button>
        </div>
      </FormInputWrapper>

      <FormInputWrapper>
        <label htmlFor='author' className='text-lg'>
          Author
        </label>
        <AuthorSelect register={register} getValues={getValues} post={post} />
      </FormInputWrapper>
      <FormInputWrapper>
        <label htmlFor='content' className='text-lg'>
          Content
        </label>
        <Controller
          name='content'
          control={control}
          render={({ field }) => <RichTextEditor {...field} />}
        />
      </FormInputWrapper>
    </>
  );
};

export default PostFields;
