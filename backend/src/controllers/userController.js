const userValidation = require('../middleware/userValidation');
const handleUserInput = require('../middleware/handleUserInput');
const getSort = require('../middleware/getSort');
const getFilter = require('../middleware/getFilter');

const User = require('../models/user');
const Post = require('../models/post');

exports.users_get = async (req, res, next) => {
  await User.find({}, 'firstName lastName fullName email role')
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(users => res.json(users))
    .catch(err => {
      if (err) next(err);
    });
};

exports.users_post = [...userValidation, handleUserInput];

exports.user_get = async (req, res, next) => {
  await User.findById(
    req.params.userid,
    'firstName lastName fullName email role'
  )
    .then(user => res.json(user))
    .catch(err => next(err));
};

exports.user_put = [...userValidation, handleUserInput];

exports.user_delete = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.userid)
    .then(deletedUser =>
      res.json({
        message: `User ${deletedUser._id} deleted`,
      })
    )
    .catch(err => next(err));
};

exports.user_posts_get = async (req, res, next) => {
  await Post.find({ author: req.params.userid, ...getFilter(req.query) })
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(userPosts => res.json(userPosts))
    .catch(err => next(err));
};
