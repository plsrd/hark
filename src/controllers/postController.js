const Post = require('../models/post');
const postValidation = require('../middleware/postValidation');
const handlePostInput = require('../middleware/handlePostInput');

exports.posts_get = async (req, res, next) => {
  await Post.find()
    .populate('author')
    .then(posts => res.json({ posts }))
    .catch(err => next(err));
};

exports.posts_post = [...postValidation, handlePostInput];

exports.post_get = (req, res, next) => {
  res.json({ message: 'Post Found' });
};

exports.post_put = (req, res, next) => {
  res.json({ message: 'Post Updated' });
};

exports.post_delete = (req, res, next) => {
  res.json({ message: 'Post Deleted' });
};
