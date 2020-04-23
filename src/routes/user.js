const controller = require('../controllers/user');

const express = require('express');

const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getByUserOrEmail);
router.post('/:username', controller.updateUser);
router.delete('/:username', controller.deleteUser);
router.post('/:username', controller.changePassword);

module.exports = router;
