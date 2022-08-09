const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const loginStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    await User.findOne({ username: username })
      .then(async user => {
        if (!user) return done(null, false, { message: 'Incorrect username' });

        const valid = await user.isValidPassword(password);

        return valid
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password' });
      })
      .catch(err => done(err));
  }
);

module.exports = loginStrategy;
