const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/postController');

router.get('/', postController.posts_get);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.posts_post
);

router.get('/:postid', postController.post_get);

router.put(
  '/:postid',
  passport.authenticate('jwt', { session: false }),
  postController.post_put
);

router.delete(
  '/:postid',
  passport.authenticate('jwt', { session: false }),
  postController.post_delete
);

router.get('/:postid/comments', postController.post_comments_get);

router.post(
  '/:postid/comments',
  passport.authenticate('jwt', { session: false }),
  postController.post_comments_post
);

router.get('/:postid/comments/:commentid', postController.post_comment_get);

router.put(
  '/:postid/comments/:commentid',
  passport.authenticate('jwt', { session: false }),
  postController.post_comment_put
);

router.delete(
  '/:postid/comments/:commentid',
  passport.authenticate('jwt', { session: false }),
  postController.post_comment_delete
);

module.exports = router;
