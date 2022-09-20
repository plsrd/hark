import Head from 'next/head';
import React from 'react';
import LoginForm from '../components/LoginForm';

const LandingPage = () => {
  return (
    <div className='h-screen w-screen bg-base-100 flex flex-col justify-center items-center'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <LoginForm />
    </div>
  );
};

export default LandingPage;

export const getServerSideProps = async ctx => {
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
