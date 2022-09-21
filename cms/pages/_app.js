import React, { useMemo, useState } from 'react';
import { UserProvider } from '../src/userContext';
import client from '../src/client';
import decode from 'jwt-decode';
import { ContentProvider } from '../src/contentContext';
import 'tailwindcss/tailwind.css';

const App = ({ Component, pageProps, existingUser, posts, authors }) => {
  const [user, setUser] = useState(existingUser);
  const [content, setContent] = useState({ posts, authors });
  const [activeDocument, setActiveDocument] = useState();

  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const contentValue = useMemo(
    () => ({ content, setContent, activeDocument, setActiveDocument }),
    [content, activeDocument]
  );

  return (
    <UserProvider value={userValue} data-theme='cmyk'>
      <ContentProvider value={contentValue}>
        <Component {...pageProps} />
      </ContentProvider>
    </UserProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const cookie = ctx?.req?.headers?.cookie;

  if (!cookie) {
    return {};
  } else {
    client.setCookie(cookie);

    const { data: posts } = await client.get('posts');
    const { data: users } = await client.get('users');

    const authors = users.filter(user => user.role != 'viewer');

    return {
      ...(cookie && { existingUser: decode(cookie) }),
      posts,
      authors,
    };
  }
};

export default App;
