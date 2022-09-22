import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import blockTools from '@sanity/block-tools';
import { toHTML } from '@portabletext/to-html';
import ContentContext from '../../../src/contentContext';
import client from '../../../src/client';
import { blockContentType } from '../../../src/blockTools';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';

const DocumentEditor = ({ type, id, data }) => {
  const [draft, setDraft] = useState(data?.isPublished);

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: data?.title,
      slug: data?.slug,
      author: data?.author._id,
      content: data && toHTML(data?.content),
    },
  });

  useEffect(() => {
    if (dirtyFields && !draft) setDraft(true);
  }, [dirtyFields]);

  const onSubmit = async fields => {
    const blocks = blockTools.htmlToBlocks(fields.content, blockContentType);

    const document = {
      ...fields,
      content: blocks,
      isPublished: true,
    };

    id == 'new'
      ? await client.post(type, document)
      : await client.put(type, id, document);

    setDraft(false);
  };

  return (
    <Layout activeDocument={id}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PostFields
          register={register}
          post={data}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />
        <input type='submit' value='Publish' />
      </form>
    </Layout>
  );
};

export default DocumentEditor;

export const getServerSideProps = async ({ params }) => {
  const { type, id } = params;

  if (id !== 'new') {
    const response = await client.get(type, id);
    return {
      props: {
        type,
        id,
        ...(response?.data ? { data: response.data } : {}),
      },
    };
  } else {
    return {
      props: {
        type,
        id,
      },
    };
  }
};
