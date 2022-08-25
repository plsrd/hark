import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const RichTextEditor = ({ value, onChange }) => {
  return <ReactQuill theme='snow' value={value} onChange={onChange} />;
};

export default RichTextEditor;
