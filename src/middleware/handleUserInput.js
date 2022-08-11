const { validationResult } = require('express-validator');
const User = require('../models/user');

const handleUserInput = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const { role: userRole, _id } = req.user;

  const errors = validationResult(req);

  const fields = {
    firstName,
    lastName,
    email,
    password,
    role,
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
    if (userRole !== 'admin' && _id.toString() !== req.params.userid) {
      return res
        .status(401)
        .send({ message: 'Users may only edit their own profile' });
    }
    User.findByIdAndUpdate(req.params.userid, fields, { new: true })
      .select('_id name email role')
      .exec((err, updatedUser) => {
        if (err) return next(err);
        res.json({ message: 'User updated', updatedUser });
      });
  };

  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), fields });
  } else {
    req.method == 'POST' ? createNewUser() : updateUser();
  }
};

module.exports = handleUserInput;
