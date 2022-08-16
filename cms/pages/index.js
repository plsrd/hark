import React, { useMemo, useState } from 'react';
import { UserProvider } from '../components/userContext';
import decode from 'jwt-decode'
import client from '../src/client';
import Login from '../components/Login';

export default function Home({ existingUser }) {
  const [user, setUser] = useState(existingUser) 
  const value = useMemo(() =>({ user, setUser}), [user])


  return (
    <UserProvider value={value}>
      {
        !user ? 
          <Login setUser={setUser}/>
          : 
          <button  onClick={() => {client.logout() 
            setUser()}}> Log Out</button>
      }
    </UserProvider>


  );
}

export const getServerSideProps = async ctx => {
  const cookie = ctx.req.headers?.cookie

    return {
      props: {
        ...(cookie && {existingUser: decode(cookie)})
      }
    }
};
