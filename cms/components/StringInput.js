import React from 'react';
import FormInputWrapper from './FormInputWrapper';

const StringInput = ({ name, register }) => {
  return (
    <FormInputWrapper>
      <label htmlFor={name} className='text-lg'>
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </label>
      <input
        type='text'
        {...register('title')}
        className='input input-bordered text-white'
      />
    </FormInputWrapper>
  );
};

export default StringInput;
