const getFilter = require('../middleware/getFilter');
const Comment = require('../models/comment');

exports.comments_get = async (req, res, next) => {
  await Comment.find(getFilter(req.query))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .populate('post', 'title')
    .populate('author', 'role firstName lastName')
    .then(comments => res.json(comments));
};
