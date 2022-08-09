const validateUser = require('../middleware/validateUser');
const handleUserInput = require('../middleware/handleUserInput');

const User = require('../models/user');

exports.users_get = async (req, res, next) => {
  await User.find()
    .then(users => res.json({ users }))
    .catch(err => {
      if (err) next(err);
    });
};

exports.users_post = [...validateUser, handleUserInput];

exports.user_get = async (req, res, next) => {
  await User.findById(req.params.userid)
    .then(user => res.json({ user }))
    .catch(err => next(err));
};

exports.user_put = [...validateUser, handleUserInput];

exports.user_delete = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.userid)
    .then(deletedUser =>
      res.json({
        message: `User ${deletedUser._id} deleted`,
      })
    )
    .catch(err => next(err));
};
