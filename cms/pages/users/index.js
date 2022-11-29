import React from 'react';
import {
  EditorWrapper,
  Layout,
  UserDeleteModal,
  UserTableRow,
} from '../../components';
import { useRouter } from 'next/router';
import client from '../../src/client';
import { PlusIcon } from '../../components/icons';

const Users = ({ users }) => {
  const router = useRouter();

  const handleDelete = async id => {
    await client.delete('users', id).then(() => {
      router.push('/users');
    });
  };

  const handleClick = () => {
    router.push('/users/new');
  };

  return (
    <Layout activeDocument='Users'>
      <EditorWrapper type='users'>
        <table className='table table-zebra w-full'>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th
              className='flex flex-row items-center justify-between tooltip tooltip-right'
              data-tip='Add User'
            >
              Actions
              <button type='button' onClick={handleClick}>
                <PlusIcon />
              </button>
            </th>
          </thead>
          <tbody>
            {users.map(user => (
              <UserTableRow user={user} />
            ))}
          </tbody>
          <UserDeleteModal handleClick={handleDelete} />
        </table>
      </EditorWrapper>
    </Layout>
  );
};

export default Users;

export const getServerSideProps = async ctx => {
  const cookie = ctx.req?.headers?.cookie;

  if (!cookie) {
    return {
      redirect: {
        destination: '/',
      },
    };
  } else {
    const { data: users } = await client.get({
      type: 'users',
      sort: 'lastName:asc',
    });
    return {
      props: {
        users,
      },
    };
  }
};
