const { body } = require('express-validator');
const User = require('../models/user');

const postValidation = [
  body('title', 'A title is required').escape().trim().isLength(1),
  body('author')
    .escape()
    .trim()
    .custom(async (authorId, { req }) => {
      const { role, _id } = req.user;
      const existingUser = await User.findById(authorId);

      if (!existingUser)
        throw new Error('An existing user must be added as author.');

      if (existingUser.role == 'viewer')
        throw new Error('You cannot assign a viewer as author');

      if (role !== 'admin' && authorId !== _id.toString())
        throw new Error(
          'Only admins can assign an author other than themselves'
        );
    }),
  body(
    'isPublished',
    'You must indicate whether the post is published'
  ).isBoolean(),
  body('content').isLength(1),
];

module.exports = postValidation;
