import React from 'react';
import Layout from '../../components/Layout';
import client from '../../src/client';

const User = () => {
  return <Layout></Layout>;
};

export default User;

export const getServerSideProps = async ({ req, params: { id } }) => {
  const cookie = req?.headers?.cookie;

  const { data } = await client.get('users', id);

  console.log(data);

  if (!cookie) {
    return {
      redirect: {
        destination: '/',
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
