import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';

const EditorNode = ({}) => {
  return <Layout></Layout>;
};

export default EditorNode;

export const getStaticProps = async ({ params }) => {
  // const { data } = await client.get(type);

  return {
    props: {
      // type,
      // data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await client
    .get('posts')
    .then(posts =>
      posts.map(post => ({ params: { type: 'posts', id: post._id } }))
    );

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};
