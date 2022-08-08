const Post = require('../models/post');

exports.posts_get = async (req, res, next) => {
  const posts = await Post.find().populate('author');
  res.json({ posts });
};

exports.posts_post = (req, res, next) => {
  res.json({ message: 'Post Created' });
};

exports.post_get = (req, res, next) => {
  res.json({ message: 'Post Found' });
};

exports.post_put = (req, res, next) => {
  res.json({ message: 'Post Updated' });
};

exports.post_delete = (req, res, next) => {
  res.json({ message: 'Post Deleted' });
};
