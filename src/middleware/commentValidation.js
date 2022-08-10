const { body } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

const commentValidation = [
  body('author')
    .trim()
    .escape()
    .custom(async (authorId, { req }) => {
      const { role, _id } = req.user;
      const existingUser = await User.findById(authorId);

      if (!existingUser) {
        throw new Error('You must be an existing user to post a comment');
      }

      if (role !== 'admin' && authorId !== _id.toString()) {
        throw new Error(
          'You cannot assign someone other than yourself as author'
        );
      }
    }),
  body('post')
    .trim()
    .custom(async (postId, { req }) => {
      const existingPost = await Post.findById(postId);

      if (!existingPost) {
        throw new Error('Comments can only be added to existing posts');
      }

      if (postId !== req.params.postid) {
        throw new Error('Comment can only be added to the current post');
      }
    }),
  body('content').isLength(1),
];

module.exports = commentValidation;
