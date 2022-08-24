import React, { useContext } from 'react';
import ContentContext from '../src/contentContext';
import Head from 'next/head';
import Nav from './Nav';
import PostListComponents from './PostListComponent';

const Layout = ({ children }) => {
  const { activeDocument } = useContext(ContentContext);
  console.log(activeDocument);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
      }}
    >
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
        <link rel='Shortcut Icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Nav />
      <div style={{}}>
        <div
          style={{
            flexBasis: 0,
            flexGrow: 1,
          }}
        >
          {activeDocument && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRight: '1px solid grey',
                boxSizing: 'border-box',
                height: '100vh',
                width: '80px',
                padding: '5px',
              }}
            >
              {activeDocument.type == 'posts' && <PostListComponents />}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
