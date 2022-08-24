const Post = require('../models/post');
const Comment = require('../models/comment');
const Image = require('../models/image');
const User = require('../models/user');

const getAllContent = async (req, res, next) => {
  const posts = await Post.find().populate(
    'author',
    'firstName lastName fullName email role'
  );
  const images = await Image.find();
  const users = await User.find({ role: { $in: ['admin', 'editor'] } }).select(
    'firstName lastName fullName email role'
  );
  const comments = await Comment.find()
    .populate('post', 'title')
    .populate('author', 'firstName lastName fullName email role');

  res.json({
    posts,
    images,
    users,
    comments,
  });
};

module.exports = getAllContent;
