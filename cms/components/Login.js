import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Login = ({ children }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const result = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin',
      },
      body: JSON.stringify({
        email: 'test@email.com',
        password: 'testtesttesttestes',
      }),
    }).then(res => res.json());

    console.log(result);
  };

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
        <button type='submit' onClick={e => handleSubmit(e)}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
