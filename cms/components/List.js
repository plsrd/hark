import React, { useContext } from 'react';
import Link from 'next/link'
import UserContext from '../src/userContext';

const List = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Link href='/content/posts'>
        <a>Posts</a>
      </Link>
      <Link href='/content/users'>
        <a>Users</a>
      </Link>
      <Link href='/content/images'>
        <a>Images</a>
      </Link>
      <Link href='/content/comments'>
        <a>Comments</a>
      </Link>
    </div>
  );
};

export default List;
