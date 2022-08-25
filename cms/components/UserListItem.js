import React from 'react';

const UserListItem = ({ user }) => {
  const { fullName, role } = user;

  return (
    <div>
      <p>{fullName}</p>
      <p>{role}</p>
    </div>
  );
};

export default UserListItem;
