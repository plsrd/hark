import React from 'react';

const UserBadge = ({ role }) => {
  let badgeColor;

  switch (role) {
    case 'admin':
      badgeColor = 'success';
      break;
    case 'editor':
      badgeColor = 'accent';
      break;
    default:
      badgeColor = 'neutral';
      break;
  }

  badgeColor = 'badge-' + badgeColor;

  return (
    <span className={`badge ${badgeColor} badge-sm`}>
      {role.slice(0, 1).toUpperCase() + role.slice(1)}
    </span>
  );
};

export default UserBadge;
