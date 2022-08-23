import React from 'react';
import LoginForm from '../components/LoginForm';

const LandingPage = () => {
  return <LoginForm />;
};

export default LandingPage;

export const getStaticProps = async ctx => {
  const cookie = ctx.req?.headers?.cookie;

  if (cookie) {
    return {
      redirect: {
        destination: '/content',
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
