const controller = require('../controllers/dht');

const express = require('express');

const router = express.Router();

router.get('/', controller.getAllResults);
router.post('/', controller.submitResults);
router.delete('/id', controller.submitResults);
module.exports = router;
