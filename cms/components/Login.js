import React, { useEffect, useState } from 'react';
import client from '../src/client';
import Head from 'next/head';

const Login = ({  }) => {
  const handleLogin = async e => {
    e.preventDefault();
    const result = await client.login()
  };

  const handleLogout = async e => {
    e.preventDefault();
    const result = await client.logout()
  }

  return (
    <div>
      <form>
        <label>
          {' '}
          Email
          <input type='email' />
        </label>
        <label>
          {' '}
          Password
          <input type='password' />
        </label>
        <button  onClick={e => handleLogin(e)}>
          Log In
        </button>
        <button  onClick={e => handleLogout(e)}> Log Out</button>
      </form>
    </div>
  );
};

export default Login;
