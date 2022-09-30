import React from 'react';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import AuthorSelect from './AuthorSelect';
import RichTextEditor from './RichTextEditor';
import FormInputWrapper from './FormInputWrapper';
import SlugInput from './SlugInput';
import StringInput from './StringInput';
import RichTextInput from './RichTextInput';

const PostFields = ({
  register,
  post,
  control,
  getValues,
  setValue,
  setContentHasChanged,
}) => {
  return (
    <>
      <StringInput name='title' register={register} />
      <SlugInput {...{ register, getValues, setValue }} />
      <AuthorSelect register={register} getValues={getValues} />
      <RichTextInput
        control={control}
        setContentHasChanged={setContentHasChanged}
      />
    </>
  );
};

export default PostFields;
