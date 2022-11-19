import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { generateBlocks, generateHTML } from '../../../src/blockTools';
import client from '../../../src/client';
import contentContext from '../../../src/contentContext';
import updateContent from '../../../src/updateContent';
import {
  Layout,
  EditorWrapper,
  FormInputWrapper,
  DocumentOptionsMenu,
  DocumentStatusBadge,
  ConfirmModal,
  PostFields,
} from '../../../components';

const DocumentEditor = ({ type, id, data }) => {
  const [draft, setDraft] = useState();
  const { setContent } = useContext(contentContext);
  const [publishedDocument, setPublishedDocument] = useState(data);
  const [contentHasChanged, setContentHasChanged] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm();

  const { dirtyFields, touchedFields } = formState;

  const resetForm = document => {
    document
      ? reset({
          ...document,
          author: document.author._id,
          content: generateHTML(document.content),
        })
      : reset({
          title: '',
          slug: '',
          author: '',
          content: '',
          isPublished: false,
        });

    setContentHasChanged(false);
  };

  const changeModal = name => {
    name == openModal ? setOpenModal(null) : setOpenModal(name);
  };

  const revertChanges = () => {
    setOpenModal(null);
    resetForm(publishedDocument);
    setDraft();
  };

  const updateSidebar = async () => await updateContent(setContent);

  const onSubmit = async fields => {
    console.log(fields);
    const blocks = generateBlocks(fields.content);
    const document = {
      ...fields,
      content: blocks,
    };

    const { data } =
      id == 'new'
        ? await client.post(type, document)
        : await client.put(type, id, document);
    await updateSidebar();
    resetForm(data);
    setPublishedDocument(data);
    setDraft(false);
    if (id == 'new')
      router.push({
        pathname: '/content/[type]/[id]',
        query: { type, id: data._id },
      });
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
    setPublishedDocument();
    setDraft();
  }, [id]);

  useEffect(() => {
    setPublishedDocument(data);
  }, [data]);

  return (
    <Layout activeDocument={id}>
      <EditorWrapper header='Post Editor'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-base-200 rounded-box flex flex-col flex-wrap  justify-center gap-5  my-5 w-9/12 p-10 '
        >
          <PostFields
            {...{
              register,
              control,
              getValues,
              setValue,
              setContentHasChanged,
              data,
              id,
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
            <DocumentStatusBadge draft={draft} />
            <div className='flex gap-4'>
              <button
                className='btn btn-primary w-24'
                type='submit'
                disabled={!draft}
              >
                Save
              </button>
              <DocumentOptionsMenu changeModal={changeModal} />
              <ConfirmModal
                {...{
                  type,
                  id,
                  data,
                  updateSidebar,
                  openModal,
                  revertChanges,
                  changeModal,
                }}
              />
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
    const { data } = await client.get(type, id);
    return {
      props: {
        type,
        id,
        ...(data ? { data } : {}),
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
