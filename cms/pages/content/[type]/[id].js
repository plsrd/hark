import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';

const EditorNode = ({ type }) => {
  return <Layout activeType={type}></Layout>;
};

export default EditorNode;

export const getServerSideProps = async ({ params }) => {
  const { type, id } = params;
  const { data } = await client.get(type, id);
  console.log(data);
  return {
    props: {
      type,
      // data,
    },
  };
};
