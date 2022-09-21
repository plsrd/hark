import React, { useContext } from 'react';
import Head from 'next/head';
import ContentContext from '../src/contentContext';
import Nav from './Nav';
import Drawer from './Drawer';

const Layout = ({ children }) => {
  const { activeDocument } = useContext(ContentContext);

  return (
    <div className='flex flex-col w-screen h-screen'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100;300;400;900&display=swap'
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
      <div className='bg-base-200 drawer drawer-mobile'>
        <input id='my-drawer-2' type='checkbox' class='drawer-toggle' />
        <div class='bg-base-100 drawer-content flex flex-col items-center justify-center'>
          <div
            className='
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content
  '
          >
            <Nav />
          </div>
          {children}
          <label
            for='my-drawer-2'
            class='btn btn-primary drawer-button lg:hidden'
          >
            Open drawer
          </label>
        </div>
        <Drawer />
      </div>
    </div>
  );
};

export default Layout;
