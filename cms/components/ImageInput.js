import React, { useState, useEffect } from 'react';
import FormInputWrapper from './FormInputWrapper';
import ImageModal from './ImageModal';
import { EditIcon, SearchIcon, UploadIcon } from './icons';
import { Cloudinary } from '@cloudinary/url-gen';
import client from '../src/client';

const ImageInput = ({ name, register, setValue }) => {
  const [existingImages, setExistingImages] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [openModal, setOpenModal] = useState(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dt3e5brus',
    },
  });

  const handleToggle = e => {
    const {
      target: { name },
    } = e;
    e.preventDefault();
    openModal == name ? setOpenModal(null) : setOpenModal(name);
  };

  const handleRemoveImage = e => {
    e.preventDefault();
    setValue('image', '');
    setPreviewImage();
  };

  useEffect(() => {
    const getImages = async () =>
      await client.get('images').then(({ data }) => setExistingImages(data));

    getImages();
  }, []);

  return (
    <FormInputWrapper>
      <input type='text' className='hidden' {...register(name)} />
      <label htmlFor={name} className='text-lg'>
        {name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
          return str.toUpperCase();
        })}
      </label>
      {previewImage ? (
        <div className='input input-bordered flex flex-col relative items-center h-fit justify-between'>
          <div className='absolute right-4 top-4 dropdown'>
            <label tabIndex={0} className='btn btn-sm btn-circle'>
              <EditIcon />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <button onClick={handleRemoveImage}>Remove image</button>
              </li>
              <li>
                <button>Select New</button>
              </li>
              <li>
                <button>Upload New</button>
              </li>
            </ul>
          </div>
          <img src={previewImage} />
        </div>
      ) : (
        <div className='input input-bordered flex items-center h-24 justify-between'>
          {/* {previewImage && <img src={previewImage} />} */}
          <span className='text-sm px-3 text-primary'>
            Select an existing image or upload a new one...
          </span>
          <div>
            <button
              className='btn btn-primary btn-sm gap-2'
              onClick={handleToggle}
              name='select'
            >
              {' '}
              <SearchIcon /> Select
            </button>
            <button
              className='btn btn-primary btn-sm mx-3 gap-2'
              name='upload'
              onClick={handleToggle}
            >
              {' '}
              <UploadIcon /> Upload
            </button>
          </div>
        </div>
      )}

      <ImageModal
        {...{
          openModal,
          handleToggle,
          setValue,
          cld,
          existingImages,
          previewImage,
          setPreviewImage,
        }}
      />
    </FormInputWrapper>
  );
};

export default ImageInput;
