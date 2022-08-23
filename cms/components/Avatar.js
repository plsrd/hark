import Link from "next/link";
import React from "react";

const Avatar = ({ user }) => {

  return (
    <div>
      <Link href='/profile'>
        <a>{`${user.firstName?.slice(0, 1)} ${user.lastName?.slice(0, 1)}`}</a>
      </Link>
    </div>
  )
}

export default Avatar