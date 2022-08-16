const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/', imageController.images_get);

router.post('/', imageController.images_post);

router.get('/:imageid', imageController.image_get);

router.put('/:imageid', imageController.image_put);

router.delete('/:imageid', imageController.image_delete);

module.exports = router;
