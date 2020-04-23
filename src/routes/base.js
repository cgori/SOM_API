const authMiddleware = require('../middleware/auth');

const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', authMiddleware.protected, require('./user'));
router.use('/DHT', authMiddleware.protected, require('./dht'));

module.exports = router;
