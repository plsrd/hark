import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import client from '../src/client';
import UserContext from '../src/userContext';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(UserContext);

  const handleLogin = async data =>
    await client.login(data).then(res => setUser(res.data.user));

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <label>
        {' '}
        Email
        <input {...register('email')} />
      </label>
      <label>
        {' '}
        Password
        <input {...register('password')} />
      </label>
      <input type='submit' value='Log In' />
    </form>
  );
};

export default LoginForm;
