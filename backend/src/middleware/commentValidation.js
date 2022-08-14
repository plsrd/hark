const { body } = require('express-validator');
const User = require('../models/user');

const commentValidation = [
  body('author')
    .trim()
    .escape()
    .custom(async (authorId, { req }) => {
      const { role, _id } = req.user;
      const existingUser = await User.findById(authorId);

      if (!existingUser) {
        throw new Error('Author must be an existing user');
      }

      if (role !== 'admin' && authorId !== _id.toString()) {
        throw new Error('Author must be the current logged in user');
      }
    }),
  body('content').isLength(1),
];

module.exports = commentValidation;
