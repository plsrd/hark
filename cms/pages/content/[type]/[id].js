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
      <EditorWrapper header='Post Editor'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-base-200 rounded-box flex flex-col flex-wrap  justify-center gap-5  my-5 w-9/12 p-10'
        >
          <PostFields
            register={register}
            post={data}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
          <div className='flex justify-between items-center mt-10'>
            <div className='h-full self-end'>
              <div className='badge badge-success h-fit'>Published</div>
            </div>
            <input
              className='btn btn-primary w-fit'
              type='submit'
              value='Publish'
            />
          </div>
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
