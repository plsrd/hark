const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) return next(err);

    req.login(user, { session: false }, err => {
      if (err) return next(err);
    });

    const token = jwt.sign(user.toJSON(), process.env.SECRET, {
      expiresIn: 604800,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
    });

    res.json(user ? { user, token } : message);
  })(req, res);
};
