const { validationResult } = require('express-validator');
const User = require('../models/user');

const updateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  const updates = {
    name,
    email,
    password,
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
  } else {
    await User.findByIdAndUpdate(req.params.userid, updates, { new: true })
      .then(updatedUser => {
        res.json({ message: 'User updated', updatedUser });
      })
      .catch(err => next(err));
  }
};

module.exports = updateUser;
