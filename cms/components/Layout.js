import React, { useContext, useState } from 'react';
import Head from 'next/head';
import UserContext from '../src/userContext';

import Nav from './Nav';
import Drawer from './Drawer';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  const [drawerToggled, setDrawerToggled] = useState(false);

  const handleToggle = () => {
    setDrawerToggled(!drawerToggled);
  };

  return (
    <>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {drawerToggled && <Drawer />}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Nav handleToggle={handleToggle} />
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
