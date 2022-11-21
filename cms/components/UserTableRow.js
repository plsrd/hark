import { UsersIcon, DeleteIcon } from './icons';
import Link from 'next/link';
import UserBadge from './UserBadge';

const UserTableRow = ({ user }) => {
  return (
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
        <label for='deleteModal' class='btn btn-sm btn-error btn-outline'>
          <DeleteIcon />
        </label>
      </th>
    </tr>
  );
};

export default UserTableRow;
