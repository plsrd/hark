import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import FormInputWrapper from './FormInputWrapper';

const AuthorSelect = ({ register }) => {
  const {
    content: { authors },
  } = useContext(ContentContext);

  return (
    <FormInputWrapper>
      <label htmlFor='author' className='text-lg'>
        Author
      </label>
      <select
        {...register('author')}
        className='select select-bordered text-white'
      >
        <option></option>
        {authors.map(author => (
          <option key={author._id} value={author._id}>
            {author.fullName}
          </option>
        ))}
      </select>
    </FormInputWrapper>
  );
};

export default AuthorSelect;
