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
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>Hark</title>

        <meta name='author' content='RD Pennell' />
        <meta
          name='description'
          content='Hark is a tiny CMS for authoring blog content'
        />
        <meta
          property='og:image'
          content='https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png'
        />
        <meta
          property='og:description'
          content='Hark is a tiny CMS for authoring blog content.'
        />
        <meta property='og:title' content='Hark' />
        <link rel='Shortcut Icon' href='/favicon.ico' type='image/x-icon' />
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
