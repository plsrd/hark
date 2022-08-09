const { validationResult } = require('express-validator');
const User = require('../models/user');

const handleUserInput = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  const fields = {
    name,
    email,
    password,
  };

  const createNewUser = () => {
    const newUser = new User(fields);
    newUser.save((err, createdUser) => {
      if (err) return next(err);

      res.json({
        message: 'User created',
        createdUser,
      });
    });
  };

  const updateUser = () => {
    User.findByIdAndUpdate(req.params.userid, fields, { new: true }).exec(
      (err, updatedUser) => {
        if (err) return next(err);
        res.json({ message: 'User updated', updatedUser });
      }
    );
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), fields });
  } else {
    req.method == 'POST' ? createNewUser() : updateUser();
  }
};

module.exports = handleUserInput;
