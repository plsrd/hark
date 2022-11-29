const passport = require('passport');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);

    const { _id, email, firstName, lastName, role } = user;

    if (!user) return res.status(401).json({ message: info.message });

    req.login(
      { user: { _id, firstName, lastName, email, role } },
      { session: false },
      err => {
        if (err) return next(err);
      }
    );

    const token = jwt.sign(user.toJSON(), process.env.SECRET, {
      expiresIn: 604800,
    });

    res.cookie('jwt', token, {
      httpOnly: false,
    });

    res.json({ message: 'Successfully authenticated', ...req.user });
  })(req, res);
};

const logout = (req, res) => {
  if (req.cookies['jwt']) {
    res.clearCookie('jwt').status(200).json({
      message: 'Logout successful',
    });
  } else {
    res.status(401).json({
      error: 'Invalid token',
    });
  }
};

module.exports = { login, logout };
