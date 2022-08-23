import React from 'react'

const AuthorListComponents = ({authors}) => {
  return (
    <ul> Authors
      {
        authors && authors.map(author => {
          return (
            <li key={author._id}>
              <p>{`${author.firstName} ${author.lastName}`}</p>
              <p>{author.role}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default AuthorListComponents