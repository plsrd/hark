const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const local = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    await User.findOne({ email })
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

const cookieExtractor = req => {
  return req && req.cookies ? req.cookies['jwt'] : null;
};

const jwt = new JWTstrategy(
  {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: cookieExtractor,
  },
  async (jwtPayload, done) => {
    await User.findById(jwtPayload._id)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err));
  }
);

module.exports = { local, jwt };
