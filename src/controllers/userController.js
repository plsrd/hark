const validateUser = require('../middleware/validateUser');
const createNewUser = require('../middleware/createNewUser');
const updateUser = require('../middleware/updateUser');

const User = require('../models/user');

exports.users_get = async (req, res, next) => {
  await User.find()
    .then(users => res.json({ users }))
    .catch(err => {
      if (err) next(err);
    });
};

exports.users_post = [...validateUser, createNewUser];

exports.user_get = async (req, res, next) => {
  await User.findById(req.params.userid)
    .then(user => res.json({ user }))
    .catch(err => next(err));
};

exports.user_put = [...validateUser, updateUser];

exports.user_delete = (req, res, next) => {
  res.json({ message: 'User Deleted' });
};
