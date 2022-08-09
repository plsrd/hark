const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const handleAuth = require('../middleware/handleAuth');

router.get('/', userController.users_get);

router.post('/', userController.users_post);

router.post('/login', handleAuth.login);

router.post('/logout', handleAuth.logout);

router.get('/:userid', userController.user_get);

router.put('/:userid', userController.user_put);

router.delete('/:userid', userController.user_delete);

router.get('/:userid/posts', userController.user_posts_get);

module.exports = router;
