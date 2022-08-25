const { body } = require('express-validator');
const User = require('../models/user');

const userValidation = [
  body('firstName', 'First name is required')
    .escape()
    .trim()
    .custom(async (firstName, { req }) => {
      if (req.method != 'PUT' && !firstName.length >= 1) {
        throw new Error('First name is required');
      }
    }),
  body('lastName', 'Last name is required')
    .escape()
    .trim()
    .custom(async (lastName, { req }) => {
      if (req.method != 'PUT' && !lastName.length >= 1) {
        throw new Error('Last name is required');
      }
    }),
  body('email', 'A valid email is required')
    .escape()
    .trim()
    .toLowerCase()
    .custom(async (email, { req }) => {
      if (req.method != 'PUT') {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id != req.params.userid)
          throw new Error('Email is already in use');
      }
    }),
  body('role')
    .trim()
    .escape()
    .custom(async (role, { req }) => {
      const isValidRole = ['admin', 'viewer', 'editor'].includes(role);
      let errorMessage;

      if (req.method != 'PUT') {
        if (!role) {
          errorMessage = 'Role is required';
        } else if (!isValidRole) {
          errorMessage = 'Invalid role';
        }
      } else if (role && !isValidRole) {
        errorMessage = 'Invalid role';
      }

      if (errorMessage) throw new Error(errorMessage);
    }),
  body('password', 'Password is required').trim().escape().isLength(1),
  body('passwordConfirm')
    .trim()
    .escape()
    .custom(async (passwordConfirm, { req }) => {
      if (req.method != 'PUT' && passwordConfirm !== req.body.password) {
        throw new Error('Passwords must match.');
      }
    }),
];

module.exports = userValidation;
