import React, { useState } from 'react';
import FormInputWrapper from './FormInputWrapper';
import ImageModal from './ImageModal';
import { SearchIcon, UploadIcon } from './icons';

const ImageInput = ({ name, register, setValue }) => {
  const [openModal, setOpenModal] = useState(null);

  const handleToggle = e => {
    const {
      target: { name },
    } = e;
    e.preventDefault();
    openModal == name ? setOpenModal(null) : setOpenModal(name);
  };

  return (
    <FormInputWrapper>
      <input type='text' className='hidden' {...register(name)} />
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
          <button
            className='btn btn-primary gap-2'
            onClick={handleToggle}
            name='select'
          >
            {' '}
            <SearchIcon /> Select
          </button>
          <button
            className='btn btn-primary mx-3 gap-2'
            name='upload'
            onClick={handleToggle}
          >
            {' '}
            <UploadIcon /> Upload
          </button>
        </div>
      </div>
      <ImageModal {...{ openModal, handleToggle, setValue }} />
    </FormInputWrapper>
  );
};

export default ImageInput;
