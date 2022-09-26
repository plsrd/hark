import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateBlocks, generateHTML } from '../../../src/blockTools';

import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostFields from '../../../components/PostFields';
import EditorWrapper from '../../../components/EditorWrapper';
import FormInputWrapper from '../../../components/FormInputWrapper';
import { DeleteIcon, DuplicateIcon, OptionsIcon } from '../../../icons';

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

  const { dirtyFields } = formState;

  const resetForm = document => {
    reset({
      ...document,
      author: document.author._id,
      content: generateHTML(document.content),
    });

    setContentHasChanged(false);
  };

  const handleClick = e => {
    e.preventDefault();

    console.log('bunts');
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
            <div className='flex gap-4'>
              <button
                className='btn btn-primary w-24'
                type='submit'
                disabled={!draft}
              >
                Save
              </button>
              <div className='dropdown dropdown-top' onClick={handleClick}>
                <label tabIndex='0' class='btn btn-outline btn-primary'>
                  <div class='indicator'>
                    <OptionsIcon />
                  </div>
                </label>
                <ul
                  tabIndex='0'
                  class='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
                >
                  <li>
                    <button className='btn btn-ghost justify-start'>
                      <DuplicateIcon />
                      Duplicate
                    </button>
                  </li>
                  <li>
                    <button className='btn btn-ghost justify-start text-error'>
                      <DeleteIcon />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
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
