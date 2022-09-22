import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import blockTools from '@sanity/block-tools';
import { toHTML } from '@portabletext/to-html';
import client from '../../../src/client';
import { blockContentType } from '../../../src/blockTools';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';
import EditorWrapper from '../../../components/EditorWrapper';

const DocumentEditor = ({ type, id, data }) => {
  const [draft, setDraft] = useState(data?.isPublished);
  console.log(data);
  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
    getValues,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (dirtyFields && !draft) setDraft(true);
  }, [dirtyFields]);

  useEffect(() => {
    reset({ ...data, author: data.author._id, content: toHTML(data.content) });
  }, [id]);

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
      <EditorWrapper type={type}>
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
      </EditorWrapper>
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
