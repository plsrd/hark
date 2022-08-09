const { body } = require('express-validator');
const Post = require('../models/post');

const commentValidation = [
  body('author').trim().escape().isLength(3),
  body('post')
    .trim()
    .custom(async (post, { req }) => {
      const existingPosts = await Post.find({}, '_id');
      if (
        !existingPosts.find(
          existingPost => existingPost._id == req.params.postid
        )
      )
        throw new Error('You must attach this comment to an existing post');
    }),
  body('content').isLength(1),
];

module.exports = commentValidation;
