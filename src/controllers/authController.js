const passport = require('passport');

exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    res.json(user);
  })(req, res);
};
