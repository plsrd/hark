import React from 'react';
import { format } from 'date-fns';
import UserBadge from './UserBadge';
import Avatar from './Avatar';

const PostTableRow = ({ post }) => {
  const { mainImage, title, author, createdAt, isPublished } = post;
  return (
    <>
      <td>
        <div className='flex items-center space-x-3'>
          <Avatar image={mainImage} />
          <div>
            <div className='font-bold'>{title}</div>
            <div className='text-sm opacity-50'>
              {format(new Date(createdAt), 'MMMM d yyyy')}
            </div>
          </div>
        </div>
      </td>
      <td>
        {author.fullName}
        <br />
        <UserBadge role={author.role} />
      </td>
      <td>
        <input type='checkbox' className='toggle' checked={isPublished} />
      </td>
    </>
  );
};

export default PostTableRow;
