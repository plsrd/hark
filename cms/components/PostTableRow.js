import React from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import client from '../src/client';
import UserBadge from './UserBadge';
import Avatar from './Avatar';

const PostTableRow = ({ post }) => {
  const router = useRouter();
  const { image, title, author, createdAt, isPublished } = post;

  const handleClick = async () => {
    await client.put('posts', post._id, { isPublished: !post.isPublished });
    router.push('/content/posts');
  };

  return (
    <>
      <td>
        <div className='flex items-center space-x-3'>
          <Avatar image={image?.url} />
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
        <input
          type='checkbox'
          className={`toggle `}
          checked={isPublished}
          onClick={handleClick}
        />
      </td>
    </>
  );
};

export default PostTableRow;
