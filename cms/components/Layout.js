import React, { useContext } from 'react';
import Head from 'next/head';
import UserContext from '../src/userContext';

const Layout = ({ children }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>Hark!</title>

        <meta name='author' content='RD Pennell' />
        <meta
          name='description'
          content='Hark is a tiny CMS for authoring blog content'
        />
        {/* <meta
          property='og:image'
          content='https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png'
        /> */}
        <meta
          property='og:description'
          content='Hark is a tiny CMS for authoring blog content.'
        />
        <meta property='og:title' content='Hark' />
        <link rel='Shortcut Icon' href='favicon.ico' type='image/x-icon' />
      </Head>
      <div>{children}</div>
    </>
  );
};
export default Layout;
