import React from 'react';
import Layout from '../components/Layout';

const Settings = () => {
  return <Layout activeDocument='Settings'></Layout>;
};

export default Settings;

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
