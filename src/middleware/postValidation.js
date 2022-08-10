const { body } = require('express-validator');
const User = require('../models/user');

const postValidation = [
  body('title', 'A title is required').escape().trim().isLength(1),
  body('author')
    .escape()
    .trim()
    .custom(async authorId => {
      const existingUsers = await User.find({}, '_id');
      if (!existingUsers.find(user => user._id.toString() == authorId))
        throw new Error('An existing user must be added as author.');
    }),
  body(
    'isPublished',
    'You must indicate whether the post is published'
  ).isBoolean(),
  body('content').isLength(1),
];

module.exports = postValidation;
