import React from "react";

const Avatar = ({ user }) => {

  return (
    <div>
      <p>{`${user.firstName?.slice(0, 1)} ${user.lastName?.slice(0, 1)}`}</p>
    </div>
  )
}

export default Avatar