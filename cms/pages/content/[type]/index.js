import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';
import PostListComponent from '../../../components/PostListComponents';

const ContentType = ({ type, data }) => {
  const documentListComponents = data?.map(document => {
    switch (type) {
      case 'posts':
        return <PostListComponent post={document} key={document._id} />;
    }
  });
  return <Layout activeType={type}>{<ul>{documentListComponents}</ul>}</Layout>;
};

export default ContentType;

export const getServerSideProps = async ({ params: { type } }) => {
  const { data } = await client.get(type);

  return {
    props: {
      type,
      data,
    },
  };
};