import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const RichTextEditor = React.forwardRef(({ value, onChange }, ref) => {
  return (
    <ReactQuill theme='snow' value={value} onChange={onChange} ref={ref} />
  );
});

export default RichTextEditor;
