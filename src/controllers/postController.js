const Post = require('../models/post');
const Comment = require('../models/comment');
const postValidation = require('../middleware/postValidation');
const handlePostInput = require('../middleware/handlePostInput');

exports.posts_get = async (req, res, next) => {
  await Post.find()
    .populate('author')
    .then(posts => res.json({ posts }))
    .catch(err => next(err));
};

exports.posts_post = [...postValidation, handlePostInput];

exports.post_get = async (req, res, next) => {
  await Post.findById(req.params.postid)
    .populate('author')
    .then(post => res.json({ post }))
    .catch(err => next(err));
};

exports.post_put = [...postValidation, handlePostInput];

exports.post_delete = async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postid)
    .then(deletedPost =>
      res.json({ message: `Post ${deletedPost._id} deleted` })
    )
    .catch(err => next(err));
};

exports.post_comments_get = async (req, res, next) => {
  await Comment.find({ post: req.params.postid })
    .then(comments => res.json({ comments }))
    .catch(err => next(err));
};
