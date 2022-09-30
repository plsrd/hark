import React from 'react';
import { Controller } from 'react-hook-form';
import RichTextEditor from './RichTextEditor';
import FormInputWrapper from './FormInputWrapper';

const RichTextInput = ({ control, setContentHasChanged }) => {
  return (
    <FormInputWrapper>
      <label htmlFor='content' className='text-lg'>
        Content
      </label>
      <Controller
        name='content'
        control={control}
        render={({ field }) => (
          <RichTextEditor
            {...field}
            setContentHasChanged={setContentHasChanged}
          />
        )}
      />
    </FormInputWrapper>
  );
};

export default RichTextInput;
