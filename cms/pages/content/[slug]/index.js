import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostListComponents from '../../../components/PostListComponents';

const ContentType = ({ data }) => {
  console.log(data);
  return <Layout>{/* <PostListComponents posts={data}/> */}</Layout>;
};

export default ContentType;

export const getServerSideProps = async ({ query: { slug } }) => {
  const { data } = await client.get(slug);

  return {
    props: {
      data,
    },
  };
};
