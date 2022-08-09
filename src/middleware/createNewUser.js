const { validationResult } = require('express-validator');
const User = require('../models/user');

const createNewUser = (req, res, next) => {
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
};

module.exports = createNewUser;
