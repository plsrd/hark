const Comment = require('../models/comment');

exports.comments_get = async (req, res, next) => {
  const comments = await Comment.find()
    .populate('post', 'title')
    .populate('author', 'role firstName lastName');

  res.json({ comments });
};
