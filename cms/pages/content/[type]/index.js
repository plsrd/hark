import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostListComponent from '../../../components/PostListComponents';

const ContentType = ({ type, data }) => {
  const documentListComponents = data?.map(document => {
    switch (type) {
      case 'posts':
        return <PostListComponent post={document} />;
    }
  });
  return <Layout>{<ul>{documentListComponents}</ul>}</Layout>;
};

export default ContentType;

export const getStaticProps = async ({ params: { type } }) => {
  const { data } = await client.get(type);

  return {
    props: {
      type,
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const types = ['posts', 'users', 'images', 'comments'];

  const postIds = await client
    .get(types[0])
    .then(res => res.data.map(post => post._id));

  const paths = postIds.map(id => ({
    params: {
      type: 'posts',
      id: id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
