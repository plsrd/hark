import React from 'react';
import { useForm } from "react-hook-form";
import client from '../src/client';

const Login = ({  }) => {
  const { register, handleSubmit } = useForm()

  const handleLogin = async data => {
    const result = await client.login(data)
  };

  const handleLogout = async e => {
    e.preventDefault();
    const result = await client.logout()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor='email'>
          {' '}
          Email
          <input type='email' {...register('email')}/>
        </label>
        <label htmlFor='password'>
          {' '}
          Password
          <input type='password'  {...register('password')}/>
        </label>
        <input type='submit' value='Log In' />
       
      </form>

      <button  onClick={e => handleLogout(e)}> Log Out</button>
    </div>
  );
};

export default Login;