import React, { useMemo, useState } from 'react';
import { UserProvider } from '../src/userContext';
import decode from 'jwt-decode';
import client from '../src/client';
import Layout from '../components/Layout';

export default function Home({ existingUser }) {
  const [user, setUser] = useState(existingUser);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserProvider value={value}>
      <Layout></Layout>
    </UserProvider>
  );
}

export const getServerSideProps = async ctx => {
  const cookie = ctx.req.headers?.cookie;

  return {
    props: {
      ...(cookie && { existingUser: decode(cookie) }),
    },
  };
};
