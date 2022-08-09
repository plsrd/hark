const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.posts_get);

router.post('/', postController.posts_post);

router.get('/:postid', postController.post_get);

router.put('/:postid', postController.post_put);

router.delete('/:postid', postController.post_delete);

router.get('/:postid/comments', postController.post_comments_get);

router.post('/:postid/comments');

router.put('/:postid/comments/:commentid');

router.delete('/:postid/comments/:commentid');

module.exports = router;
