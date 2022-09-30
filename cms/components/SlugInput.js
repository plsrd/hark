import React from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import FormInputWrapper from './FormInputWrapper';

const SlugInput = ({ register, getValues, setValue }) => {
  const generateSlug = e => {
    e.preventDefault();
    const { title } = getValues();
    setValue('slug', slugify(title, { lower: true }));
  };

  return (
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
  );
};

export default SlugInput;
