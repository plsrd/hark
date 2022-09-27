import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const RichTextEditor = React.forwardRef(
  ({ value, onChange, setContentHasChanged }, ref) => {
    const modules = {
      toolbar: {
        container: [
          [{ header: [false, 1, 2, 3, 4] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      },
    };

    const handleKeyPress = () => {
      setContentHasChanged(true);
    };

    const handleChange = (content, delta, source) => {
      if (source == 'user') setContentHasChanged(true);
      onChange(content);
    };

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'code',
    ];

    return (
      <ReactQuill
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        ref={ref}
        className='bg-base-100 input input-bordered h-96 font-sans'
      />
    );
  }
);

export default RichTextEditor;
