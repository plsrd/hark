import React from 'react';
import Layout from '../../components/Layout';

const Content = () => {
  return (
    <Layout>
      <div>content</div>
    </Layout>
  );
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
