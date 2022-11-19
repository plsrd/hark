import React, { useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import client from '../src/client';
import { useForm } from 'react-hook-form';

const ImageModal = ({
  openModal,
  handleToggle,
  setValue,
  cld,
  existingImages,
  previewImage,
  setPreviewImage,
  getValues,
}) => {
  const { register, watch, getValues: getUpload } = useForm();

  const imageFieldValue = watch('upload');

  const handleImageSelection = image => {
    setPreviewImage(image.url);
    setValue('image', image._id, { shouldDirty: true });
  };

  const handleClose = e => {
    if (getValues('image') == '') setPreviewImage();
    handleToggle(e);
  };

  const handleUpload = async e => {
    const formData = new FormData();
    formData.append('image', getUpload('upload')[0]);

    await client
      .uploadImage(formData)
      .then(({ data }) => setValue('image', data._id, { shouldDirty: true }));

    handleToggle(e);
  };

  useEffect(() => {
    if (!imageFieldValue || !imageFieldValue[0]) return;
    setPreviewImage(URL.createObjectURL(imageFieldValue[0]));
  }, [imageFieldValue]);

  return (
    <div className={`modal ${openModal ? 'modal-open' : ''}`}>
      <div className='modal-box relative flex flex-col'>
        {' '}
        <button
          type='button'
          onClick={handleClose}
          className='btn btn-sm btn-circle absolute right-4 top-4'
        >
          ✕
        </button>
        <h3 className='text-lg font-bold'>Select Image</h3>
        {openModal == 'select' && (
          <div className='flex flex-row flex-wrap gap-2 my-8 bg-neutral justify-center'>
            {existingImages.map(image => {
              const img = cld.image(image.filename + '.png');
              img.resize(fill().width(200));
              return (
                <button
                  type='button'
                  key={image._id}
                  onClick={e => {
                    handleToggle(e);
                    handleImageSelection(image);
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
            {previewImage && <img src={previewImage} />}
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
            <button type='button' onClick={handleUpload}>
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
