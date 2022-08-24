import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ContentContext from '../../../src/contentContext';
import client from '../../../src/client';
import Layout from '../../../components/Layout';
import hiddenFields from '../../../src/hiddenFields';
import AuthorSelect from '../../../components/AuthorSelect';
import PostFields from '../../../components/PostFields';

const DocumentEditor = ({ type, id, data }) => {
  const { register, handleSubmit } = useForm();
  const { activeDocument, setActiveDocument } = useContext(ContentContext);

  useEffect(() => {
    if (!activeDocument) {
      setActiveDocument({ type, id });
    }
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            borderBottom: '1px solid black',
            padding: '1rem',
            margin: '1rem 0',
          }}
        >
          <h1>{data.title}</h1>
          <p>Created:{data.createdAt}</p>
          <p>Updated:{data.updatedAt}</p>
          <p>{data.isPublished ? 'Published!' : 'Draft'}</p>
        </div>
        <form onSubmit={handleSubmit(data => console.log('data', data))}>
          <PostFields register={register} post={data} />
          <input type='submit' value='Publish' />
        </form>
      </div>
    </Layout>
  );
};

export default DocumentEditor;

export const getServerSideProps = async ({ params }) => {
  const { type, id } = params;
  const { data } = await client.get(type, id);

  return {
    props: {
      type,
      id,
      data,
    },
  };
};
