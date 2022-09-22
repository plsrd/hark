import React from 'react';
import Layout from '../../components/Layout';

const Content = () => {
  return <Layout></Layout>;
};

export default Content;

export const getServerSideProps = async ctx => {
  const cookie = ctx.req?.headers?.cookie;

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
