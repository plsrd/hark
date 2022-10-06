import React, { useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import client from '../src/client';
import { useForm } from 'react-hook-form';
import { UploadIcon } from './icons';

const ImageModal = ({ openModal, handleToggle, setValue }) => {
  const [existingImages, setExistingImages] = useState([]);
  const { register, reset, watch, getValues } = useForm();
  const [imagePreview, setImagePreview] = useState();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dt3e5brus',
    },
  });

  const imageFieldValue = watch('upload');

  useEffect(() => {
    if (!imageFieldValue) return;
    setImagePreview(imageFieldValue[0]);
  }, [imageFieldValue]);

  useEffect(() => {
    const getImages = async () =>
      await client.get('images').then(({ data }) => setExistingImages(data));

    getImages();
  }, []);

  const handleSave = async e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', getValues('upload')[0]);

    await client
      .uploadImage(formData)
      .then(({ data }) => setValue('image', data._id));

    handleToggle(e);
  };

  return (
    <div className={`modal ${openModal ? 'modal-open' : ''}`}>
      <div className='modal-box relative flex flex-col'>
        {' '}
        <button
          onClick={handleToggle}
          className='btn btn-sm btn-circle absolute right-4 top-4'
        >
          ✕
        </button>
        <h3 className='text-lg font-bold'>Select Image</h3>
        {openModal == 'select' && (
          <div className='flex flex-row gap-2 my-8 bg-neutral'>
            {existingImages.map(image => {
              const img = cld.image(image.filename + '.png');
              img.resize(fill().width(100).height(100));
              return (
                <button
                  key={image._id}
                  onClick={e => {
                    e.preventDefault();
                    handleImageSelection(image._id);
                  }}
                >
                  <AdvancedImage cldImg={img} />
                </button>
              );
            })}
          </div>
        )}
        {openModal == 'upload' && (
          <div className='flex flex-col gap-2 mt-8'>
            {imagePreview && <img src={URL.createObjectURL(imagePreview)} />}
            <label className='btn btn-primary btn-sm gap-2' htmlFor='file'>
              {' '}
              Browse...
            </label>
            <input
              id='file'
              className='hidden'
              type='file'
              accept='image/*'
              {...register('upload')}
            />
            <button onClick={handleSave}>Upload</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
