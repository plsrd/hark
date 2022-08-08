const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const newUserValidation = require('../middleware/newUserValidation');

exports.users_get = async (req, res, next) => {
  const users = await User.find();

  res.json({ users });
};

exports.users_post = [
  ...newUserValidation,
  (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    const user = new User({
      name,
      email,
      password,
    });

    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() });
    } else {
      user.save((err, user) => {
        if (err) next(err);

        res.json({
          message: 'User Created',
          user,
        });
      });
    }
  },
];

exports.user_get = (req, res, next) => {
  res.json({ message: 'User Found' });
};

exports.user_put = (req, res, next) => {
  res.json({ message: 'User Updated' });
};

exports.user_delete = (req, res, next) => {
  res.json({ message: 'User Deleted' });
};
