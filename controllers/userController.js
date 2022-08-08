const User = require('../models/user');

exports.users_get = (req, res, next) => {
  res.json({ message: 'All Posts' });
};

exports.users_post = (req, res, next) => {
  res.json({ message: 'User Created' });
};

exports.user_get = (req, res, next) => {
  res.json({ message: 'User Found' });
};

exports.user_put = (req, res, next) => {
  res.json({ message: 'User Updated' });
};

exports.user_delete = (req, res, next) => {
  res.json({ message: 'User Deleted' });
};
