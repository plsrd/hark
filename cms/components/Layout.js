import React from 'react';
import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh'
      }}>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <title>Hark!</title>

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
          <link rel='Shortcut Icon' href='favicon.ico' type='image/x-icon' />
        </Head>
        <Nav />
        <div
            style={{

            }}
          >
            <div style={{
              flexBasis: 0,
              flexGrow: 1
            }}>{children}</div>
          </div>
      </div>
  );
};
export default Layout;

