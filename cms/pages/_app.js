import React, { useMemo, useState } from 'react';
import { UserProvider } from '../src/userContext';
import client from '../src/client';
import decode from 'jwt-decode';
import { ContentProvider } from '../src/contentContext';
import '../styles/reset.css';

const App = ({ Component, pageProps, existingUser, allContent }) => {
  const [user, setUser] = useState(existingUser);
  const [content, setContent] = useState(allContent);
  const [activeDocument, setActiveDocument] = useState();

  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const contentValue = useMemo(
    () => ({ content, setContent, activeDocument, setActiveDocument }),
    [content, activeDocument]
  );

  return (
    <UserProvider value={userValue}>
      <ContentProvider value={contentValue}>
        <Component {...pageProps} />
      </ContentProvider>
    </UserProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const cookie = ctx?.req?.headers?.cookie;
  client.setCookie(cookie);

  const { data: allContent } = await client.get('*');

  return {
    ...(cookie && { existingUser: decode(cookie) }),
    allContent,
  };
};

export default App;
