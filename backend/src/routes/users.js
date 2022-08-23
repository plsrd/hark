const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/', userController.users_get);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.users_post
);

router.get('/:userid', userController.user_get);

router.put(
  '/:userid',
  passport.authenticate('jwt', { session: false }),
  userController.user_put
);

router.delete(
  '/:userid',
  passport.authenticate('jwt', { session: false }),
  userController.user_delete
);

router.get('/:userid/posts', userController.user_posts_get);

module.exports = router;
