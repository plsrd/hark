const { body } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

const commentValidation = [
  body('author')
    .trim()
    .escape()
    .custom(async authorId => {
      const existingUsers = await User.find({}, '_id');
      if (!existingUsers.find(existingUser => existingUser._id == authorId))
        throw new Error('You must be an existing user to post a comment');
    }),
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
