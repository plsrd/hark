const express = require('express');
const router = express.Router();
const passport = require('passport');
const handleAuth = require('../middleware/handleAuth');

router.post('/login', handleAuth.login);

router.post('/logout', handleAuth.logout);

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
