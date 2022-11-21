import React from 'react';
import { EditorWrapper, UserBadge, Layout } from '../../components';
import { UsersIcon, DeleteIcon } from '../../components/icons';
import { useRouter } from 'next/router';
import client from '../../src/client';
import Link from 'next/link';

const Users = ({ users }) => {
  const router = useRouter();

  const handleClick = async id => {
    await client.delete('users', id).then(() => {
      router.push('/users');
    });
  };

  return (
    <Layout activeDocument='Users'>
      <EditorWrapper type='Users'>
        <table className='table w-full'>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <Link href={`/users/${user._id}`}>
                    <a>
                      <div className='flex items-center space-x-3'>
                        <UsersIcon />
                        <div>
                          <div className='font-bold'>{user.fullName}</div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </td>
                <td>
                  <div className='text-sm opacity-50'>{user.email}</div>
                </td>
                <td>
                  <UserBadge role={user.role} />
                </td>
                <th>
                  <label
                    for='deleteModal'
                    class='btn btn-sm btn-error btn-outline'
                  >
                    <DeleteIcon />
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
          <input type='checkbox' id='deleteModal' class='modal-toggle' />
          <div class='modal'>
            <div class='modal-box relative flex flex-col'>
              <label
                for='deleteModal'
                class='btn btn-sm btn-circle absolute right-2 top-2'
              >
                ✕
              </label>
              <h3 class='text-lg font-bold'>Delete user?</h3>
              <div className='self-end flex gap-2 my-8'>
                <button
                  name='deleteButton'
                  className='btn btn-error'
                  onClick={handleClick}
                >
                  Confirm
                </button>
                <label for='deleteModal' className='btn btn-primary'>
                  Cancel
                </label>
              </div>
            </div>
          </div>
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
    const { data: users } = await client.get('users');
    return {
      props: {
        users,
      },
    };
  }
};
