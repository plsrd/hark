import React from 'react';
import Layout from '../../components/Layout';
import client from '../../src/client';

const User = ({ user }) => {
  return <Layout></Layout>;
};

export default User;

export const getServerSideProps = async ({ req, params: { id } }) => {
  const cookie = req?.headers?.cookie;

  const { data: user } = await client.get({ type: 'users', id });

  if (!cookie) {
    return {
      redirect: {
        destination: '/',
      },
    };
  } else {
    return {
      props: { user },
    };
  }
};
