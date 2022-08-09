const { validationResult } = require('express-validator');

const User = require('../models/user');
const validation = require('../middleware/validation');
const createNewUser = require('../middleware/createNewUser');

exports.users_get = async (req, res, next) => {
  await User.find()
    .then(users => res.json({ users }))
    .catch(err => {
      if (err) next(err);
    });
};

exports.users_post = [...validation.newUserValidation, createNewUser];

exports.user_get = async (req, res, next) => {
  await User.findById(req.params.userid)
    .then(user => res.json({ user }))
    .catch(err => next(err));
};

exports.user_put = (req, res, next) => {
  res.json({ message: 'User Updated' });
};

exports.user_delete = (req, res, next) => {
  res.json({ message: 'User Deleted' });
};
