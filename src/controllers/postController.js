const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');
const postValidation = require('../middleware/postValidation');
const commentValidation = require('../middleware/commentValidation');
const handlePostInput = require('../middleware/handlePostInput');
const handleCommentInput = require('../middleware/handleCommentInput');
const getSort = require('../../public/javascripts/getSort');
const getFilter = require('../../public/javascripts/getFilter');

//http://localhost:3000/api/posts/62f1cedfa3e4c3d96de46b39/comments/62f295f55e0d3412dc253a91

exports.posts_get = async (req, res, next) => {
  await Post.find(getFilter(req.query))
    .populate('author')
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

exports.posts_post = [
  ...postValidation,
  passport.authenticate('jwt', { session: false }),
  handlePostInput,
];

exports.post_get = async (req, res, next) => {
  await Post.findById(req.params.postid)
    .populate('author')
    .then(post => res.json(post))
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
  await Comment.find({ post: req.params.postid, ...getFilter(req.query) })
    .sort(getSort(req.query.sort))
    .limit(req.query.limit)
    .skip(req.query.skip)
    .then(comments => res.json(comments))
    .catch(err => next(err));
};

exports.post_comments_post = [...commentValidation, handleCommentInput];

exports.post_comment_get = async (req, res, next) => {
  await Comment.findById(req.params.commentid)
    .then(comment => res.json(comment))
    .catch(err => next(err));
};

exports.post_comment_put = [...commentValidation, handleCommentInput];

exports.post_comment_delete = async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentid)
    .then(deletedComment =>
      res.json({ message: `Comment ${deletedComment._id} deleted` })
    )
    .catch(err => next(err));
};
