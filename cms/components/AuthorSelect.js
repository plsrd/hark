import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';

const AuthorSelect = ({ register, selected }) => {
  const {
    content: { users },
  } = useContext(ContentContext);

  return (
    <select {...register('author')} defaultValue={selected}>
      {users.map(author => (
        <option key={author._id} value={author._id}>
          {author.fullName}
        </option>
      ))}
    </select>
  );
};

export default AuthorSelect;
