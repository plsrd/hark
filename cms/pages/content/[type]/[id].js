import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateBlocks, generateHTML } from '../../../src/blockTools';

import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';
import EditorWrapper from '../../../components/EditorWrapper';

const DocumentEditor = ({ type, id, data }) => {
  const [document, setDocument] = useState(data);
  const [draft, setDraft] = useState(!data?.isPublished);
  const [contentHasChanged, setContentHasChanged] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
  } = useForm();

  const { dirtyFields, touchedFields } = formState;

  const resetForm = document => {
    reset({
      ...document,
      author: document.author._id,
      content: generateHTML(document.content),
    });

    setContentHasChanged(false);
    setDraft(!document.isPublished);
  };

  useEffect(() => {
    if (!contentHasChanged) {
      delete dirtyFields.content;
    }

    if ((Object.keys(dirtyFields).length || contentHasChanged) && !draft) {
      setDraft(true);
    }
  }, [contentHasChanged, formState]);

  useEffect(() => {
    resetForm(document);
  }, [id]);

  const onSubmit = async fields => {
    const blocks = generateBlocks(fields.content);

    const document = {
      ...fields,
      content: blocks,
      isPublished: true,
    };

    const {
      data: { updatedPost },
    } =
      id == 'new'
        ? await client.post(type, document)
        : await client.put(type, id, document);

    setDocument(updatedPost);

    resetForm(updatedPost);
  };

  return (
    <Layout activeDocument={id}>
      <EditorWrapper header='Post Editor'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-base-200 rounded-box flex flex-col flex-wrap  justify-center gap-5  my-5 w-9/12 p-10 '
        >
          <PostFields
            post={data}
            {...{
              register,
              control,
              getValues,
              setValue,
              setContentHasChanged,
            }}
          />
          <div className='flex justify-between items-center mt-10'>
            <div className='h-full self-end'>
              {draft ? (
                <div className='badge badge-success h-fit'>Draft</div>
              ) : (
                <div className='badge badge-success h-fit'>Published</div>
              )}
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
