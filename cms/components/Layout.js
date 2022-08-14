import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title> Hark! </title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
