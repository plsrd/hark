import React, { useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import client from '../src/client';

const ImageSelectModal = ({ openModal, handleImageSelection, handleClick }) => {
  const [existingImages, setExistingImages] = useState([]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dt3e5brus',
    },
  });

  useEffect(() => {
    const getImages = async () =>
      await client.get('images').then(({ data }) => setExistingImages(data));

    getImages();
  }, []);

  return (
    <div className={`modal ${openModal ? 'modal-open' : ''}`}>
      <div className='modal-box relative flex flex-col'>
        {' '}
        <button
          onClick={handleClick}
          className='btn btn-sm btn-circle absolute right-4 top-4'
        >
          ✕
        </button>
        <h3 className='text-lg font-bold'>Select Image</h3>
        <div className='flex flex-row gap-2 my-8 bg-neutral'>
          {existingImages.map(image => {
            const img = cld.image(image.filename + '.png');
            img.resize(fill().width(100).height(100));
            return (
              <button
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
      </div>
    </div>
  );
};

export default ImageSelectModal;
