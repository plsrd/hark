const express = require('express');
const router = express.Router();
const handleAuth = require('../middleware/handleAuth');

router.post('/login', handleAuth.login);

router.post('/logout', handleAuth.logout);

module.exports = router;
