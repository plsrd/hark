import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import UserContext from '../src/userContext';
import client from '../src/client';

import Nav from './Nav';
import Drawer from './Drawer';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  const [allContent, setAllContent] = useState()
  const [drawerToggled, setDrawerToggled] = useState(false);

  useEffect(() => {
    const getAllContent = async () => await client.getAllContent().then(res => setAllContent(res.data))

    getAllContent() 
  }, [])

  const handleToggle = () => {
    setDrawerToggled(!drawerToggled);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height:'100vh'
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {drawerToggled && <Drawer allContent={allContent} />}
        
      </div>
      <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh'
          }}
        >
          <Nav handleToggle={handleToggle} />
          <div style={{
            flexBasis: 0,
            flexGrow: 1
          }}>{children}</div>
        </div>
    </div>
  );
};
export default Layout;
