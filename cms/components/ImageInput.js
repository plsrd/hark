import React, { useState } from 'react';
import FormInputWrapper from './FormInputWrapper';
import ImageSelectModal from './ImageSelectModal';
import { SearchIcon, UploadIcon } from './icons';

const ImageInput = ({ name, register, setValue }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  const handleImageSelection = id => {
    setValue('mainImage/select', id);
  };

  return (
    <FormInputWrapper>
      <label htmlFor={name} className='text-lg'>
        {name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
          return str.toUpperCase();
        })}
      </label>
      <div className='input input-bordered flex items-center h-24 justify-between'>
        <span className='text-sm px-3 text-primary'>
          Select an existing image or upload a new one...
        </span>
        <div>
          <input
            type='text'
            className='hidden'
            {...register(name + '/select')}
          />
          <button className='btn btn-primary gap-2' onClick={handleClick}>
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
              {...register(name + '_upload')}
            />
          </label>
        </div>
      </div>
      <ImageSelectModal {...{ openModal, handleImageSelection, handleClick }} />
    </FormInputWrapper>
  );
};

export default ImageInput;
