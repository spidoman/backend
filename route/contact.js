const express = require('express');
const router = express.Router();
const contactController = require('../userController/contactController');

router.post('/send', contactController.createMessage);
router.get('/messages', contactController.getAllMessages);

router.get('/', contactController.getAllMessages);
router.delete('/:id', contactController.deleteMessage);

module.exports = router;
