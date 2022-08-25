import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ContentContext from '../../../src/contentContext';
import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';
import { blockContentType } from '../../../src/blockTools';
import blockTools from '@sanity/block-tools';

const EditorNode = ({ type, id, data }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: data.title,
      author: data.author._id,
      content: '<em>MAGIC</em>',
    },
  });

  const { activeDocument, setActiveDocument } = useContext(ContentContext);

  useEffect(() => {
    if (!activeDocument) {
      setActiveDocument({ type, id });
    }
  }, []);

  const onSubmit = data => {
    const blocks = blockTools.htmlToBlocks(data.content, blockContentType);

    console.log({
      ...data,
      content: blocks,
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <PostFields register={register} post={data} control={control} />
          <input type='submit' value='Publish' />
        </form>
      </div>
    </Layout>
  );
};

export default EditorNode;

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
