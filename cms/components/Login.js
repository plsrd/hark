import React from 'react';
import { useForm } from "react-hook-form";
import client from '../src/client';

const LoginForm = ({setUser}) => {
  const { register, handleSubmit } = useForm()

  const handleLogin = async data => {
    const result = await client.login(data)
    setUser(result.data.user)
  };

  return (
        <>
        <form onSubmit={handleSubmit(handleLogin)}>
        <label>
          {' '}
          Email
          <input {...register('email')}/>
        </label>
        <label>
          {' '}
          Password
          <input {...register('password')}/>
        </label>
        <input type='submit' value='Log In' />
      </form>
      </>
  );
};

export default LoginForm;
