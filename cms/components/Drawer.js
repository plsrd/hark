import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../src/userContext';
import client from '../src/client';
import PostListComponents from './PostListComponents';

const Drawer = ({ allContent }) => {
  const { user } = useContext(UserContext);

  return (
    <>{!user ? <p>login to see content</p> : <PostListComponents posts={allContent?.posts} />}</>
  );
};

export default Drawer;
