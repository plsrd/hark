import React from 'react';
import FormInputWrapper from './FormInputWrapper';
import { SearchIcon, UploadIcon } from './icons';

const ImageInput = ({ name, register }) => {
  return (
    <FormInputWrapper>
      <label htmlFor={name} className='text-lg'>
        {name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
          return str.toUpperCase();
        })}
      </label>
      <div className='input input-bordered flex items-center h-24 justify-between'>
        <span className='text-xs px-3'>
          Select an existing image or upload a new one...
        </span>
        <div>
          <button className='btn btn-primary gap-2'>
            {' '}
            <SearchIcon /> Select
          </button>
          <label>
            <span className='btn btn-primary mx-3 gap-2'>
              {' '}
              <UploadIcon /> Upload
            </span>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              {...register(name)}
            />
          </label>
        </div>
      </div>
    </FormInputWrapper>
  );
};

export default ImageInput;
