const passport = require('passport');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.status(404).json({ message: info.message });

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

    res.json({ message: 'Successfully authenticated' });
  })(req, res);
};

const logout = (req, res) => {
  if (req.cookies['jwt']) {
    res.clearCookie('jwt').status(200).json({
      message: 'You have logged out',
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
};

module.exports = { login, logout };
