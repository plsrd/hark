import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import client from '../src/client';
import UserContext from '../src/userContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = async data =>
    await client
      .login(data)
      .then(res => setUser(res.data.user))
      .then(() => router.push('/content'));

  return (
    <div className='card w-fit'>
      <div className='car-title font-metal text-9xl text-center mt-2 tracking-wider text-white'>
        hark
      </div>
      <div className='card-body'>
        <form
          className='form-control flex flex-col space-y-4'
          onSubmit={handleSubmit(handleLogin)}
        >
          <label className='input-group'>
            <span className={errors.email ? 'text-error' : ''}>Email</span>
            <input
              type='email'
              className={`input input-bordered w-full ${
                errors.email && 'border-error border-2'
              }`}
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
          </label>
          {errors.email && (
            <span className='label-text-alt text-error'>
              Enter a valid email
            </span>
          )}
          <label className='input-group'>
            <span className={errors.password ? 'text-error' : ''}>
              Password
            </span>
            <input
              type='password'
              className={`input input-bordered w-full ${
                errors.password && 'border-error border-2'
              }`}
              {...register('password', { required: true })}
            />
          </label>
          {errors.password && (
            <span className='label-text-alt text-error'>
              Password is required
            </span>
          )}
          <input
            className='btn btn-neutral self-end'
            type='submit'
            value='Log In'
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
