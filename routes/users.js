const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.users_get);

router.post('/', userController.users_post);

router.get('/:userid', userController.user_get);

router.put('/:userid', userController.user_put);

router.delete('/:userid', userController.user_delete);

module.exports = router;
