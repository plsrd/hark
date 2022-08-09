const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.posts_get);

router.post('/', postController.posts_post);

router.get('/:postid', postController.post_get);

router.put('/:postid', postController.post_put);

router.delete('/:postid', postController.post_delete);

router.get('/:postid/comments', postController.post_comments_get);

router.post('/:postid/comments', postController.post_comments_post);

router.get('/:postid/comments/:commentid', postController.post_comment_get);

router.put('/:postid/comments/:commentid', postController.post_comment_put);

router.delete('/:postid/comments/:commentid');

module.exports = router;
