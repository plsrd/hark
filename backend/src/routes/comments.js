const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.comments_get);

module.exports = router;
