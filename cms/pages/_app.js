import React, { useMemo, useState }  from "react";
import { UserProvider } from '../src/userContext';
import decode from 'jwt-decode';

import '../styles/reset.css'

const  App = ({ Component, pageProps, existingUser }) => {
  const [user, setUser] = useState(existingUser);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserProvider value={value}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

App.getInitialProps = async ({ctx}) => {
  const cookie = ctx.req.headers?.cookie;

  return {
      ...(cookie && { existingUser: decode(cookie) }),
  };
};

export default App;
