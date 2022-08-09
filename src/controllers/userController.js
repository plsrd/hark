const { validationResult } = require('express-validator');

const User = require('../models/user');
const validation = require('../middleware/validation');
const createNewUser = require('../middleware/createNewUser');

exports.users_get = async (req, res, next) => {
  const users = await User.find();

  res.json({ users });
};

exports.users_post = [...validation.newUserValidation, createNewUser];

exports.user_get = (req, res, next) => {
  res.json({ message: 'User Found' });
};

exports.user_put = (req, res, next) => {
  res.json({ message: 'User Updated' });
};

exports.user_delete = (req, res, next) => {
  res.json({ message: 'User Deleted' });
};
