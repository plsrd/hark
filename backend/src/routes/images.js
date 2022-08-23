const express = require('express');
const router = express.Router();
const passport = require('passport');
const imageController = require('../controllers/imageController');

router.get('/', imageController.images_get);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  imageController.images_post
);

router.get('/:imageid', imageController.image_get);

router.put(
  '/:imageid',
  passport.authenticate('jwt', { session: false }),
  imageController.image_put
);

router.delete(
  '/:imageid',
  passport.authenticate('jwt', { session: false }),
  imageController.image_delete
);

module.exports = router;
