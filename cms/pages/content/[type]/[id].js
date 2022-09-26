import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateBlocks, generateHTML } from '../../../src/blockTools';

import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';
import EditorWrapper from '../../../components/EditorWrapper';
import FormInputWrapper from '../../../components/FormInputWrapper';

const DocumentEditor = ({ type, id, data }) => {
  const [draft, setDraft] = useState();
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
    resetForm(data);
    setDraft();
  }, [id]);

  const onSubmit = async fields => {
    const blocks = generateBlocks(fields.content);

    const document = {
      ...fields,
      content: blocks,
    };

    const {
      data: { updatedPost },
    } =
      id == 'new'
        ? await client.post(type, document)
        : await client.put(type, id, document);

    resetForm(updatedPost);
    setDraft(false);
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
          <FormInputWrapper>
            <label className='label cursor-pointer'>
              <span className='label-text'>Published?</span>
              <input
                {...register('isPublished')}
                type='checkbox'
                className='toggle toggle-primary'
              />
            </label>
          </FormInputWrapper>
          <div className='flex justify-between items-center mt-10'>
            <div className='h-full self-end'>
              {draft == undefined ? null : draft ? (
                <div className='badge badge-accent h-fit'>Unsaved</div>
              ) : (
                <div className='badge badge-success h-fit'>Saved!</div>
              )}
            </div>
            <input
              className='btn btn-primary w-fit'
              type='submit'
              value='Save'
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
