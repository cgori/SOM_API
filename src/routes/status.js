const controller = require('../controllers/status');

const express = require('express');

const router = express.Router();

router.get('/', controller.getAll);


module.exports = router;
