const { body } = require('express-validator');
const User = require('../models/user');

const postValidation = [
  body('title')
    .trim()
    .custom(async (title, { req }) => {
      if (req.method != 'PUT' && !title.length)
        throw new Error('A title is required');
    }),
  body('author')
    .trim()
    .custom(async (authorId, { req }) => {
      if (req.method != 'PUT') {
        const { role, _id } = req.user;
        const existingUser = await User.findById(authorId);

        if (!existingUser)
          throw new Error('An existing user must be added as author.');

        if (existingUser.role == 'viewer')
          throw new Error('A viewer cannot be assigned as an author');

        if (role !== 'admin' && authorId !== _id.toString())
          throw new Error('Author must be the current logged in user');
      }
    }),
  body('isPublished').custom(async (isPublished, { req }) => {
    if (req.method != 'PUT') {
      if (typeof isPublished !== 'boolean')
        throw new Error('You must indicate whether the post is published');
    }
  }),
  body('slug')
    .trim()
    .custom(async (slug, { req }) => {
      if (req.method != 'PUT') {
        if (!slug.length >= 1) throw new Error('Slug is required');
      }
    }),
  body('content').custom(async (content, { req }) => {
    if (req.method != 'PUT') {
      if (!content.length >= 1) throw new Error('Content is required');
    }
  }),
];

module.exports = postValidation;
