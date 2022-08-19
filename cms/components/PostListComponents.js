import React from 'react';
import { format } from 'date-fns'

const PostListComponents = ({posts}) => {
  return (
    <ul> Posts
      {
        posts &&
        posts.map(post => {
          return (<li key={post._id}>
            <p>{post.title}</p>
            <p>{post.author && `${post.author.firstName} ${post.author.lastName}`}</p>
            <p>{format(new Date(post.createdAt), 'MM/dd/yyyy')}</p>
          </li>)
        })
      }
    </ul>
  )
}

export default PostListComponents;