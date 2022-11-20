import React from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import client from '../src/client';
import UserBadge from './UserBadge';
import Avatar from './Avatar';
import Link from 'next/link';

const PostTableRow = ({ post }) => {
  const router = useRouter();
  const { _id, image, title, author, createdAt, isPublished } = post;

  const handleClick = async () => {
    await client.put('posts', post._id, { isPublished: !post.isPublished });
    router.push('/content/posts');
  };

  return (
    <>
      <td>
        <Link href={`/content/posts/${_id}`}>
          <a>
            <div className='flex items-center space-x-3'>
              <Avatar image={image?.url} />
              <div>
                <div className='font-bold'>{title}</div>
                <div className='text-sm opacity-50'>
                  {format(new Date(createdAt), 'MMMM d yyyy')}
                </div>
              </div>
            </div>
          </a>
        </Link>
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
          defaultChecked={isPublished}
          onChange={handleClick}
        />
      </td>
    </>
  );
};

export default PostTableRow;
