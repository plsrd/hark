const Post = require('../models/post');
const Comment = require('../models/comment');
const postValidation = require('../middleware/postValidation');
const commentValidation = require('../middleware/commentValidation');
const handlePostInput = require('../middleware/handlePostInput');
const handleCommentInput = require('../middleware/handleCommentInput');

//http://localhost:3000/api/posts/62f1cedfa3e4c3d96de46b39/comments/62f295f55e0d3412dc253a91

exports.posts_get = async (req, res, next) => {
  await Post.find()
    .populate('author')
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

exports.posts_post = [...postValidation, handlePostInput];

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
  await Comment.find({ post: req.params.postid })
    .then(comments => res.json(comments))
    .catch(err => next(err));
};

exports.post_comments_post = [...commentValidation, handleCommentInput];

exports.post_comment_get = async (req, res, next) => {
  await Comment.findById(req.params.commentid).then(comment =>
    res.json(comment)
  );
};

exports.post_comment_put = [...commentValidation, handleCommentInput];
