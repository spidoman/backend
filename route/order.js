const express = require('express');
const router = express.Router();
const orderController = require('../userController/orderController');


router.post('/confirm', orderController.confirmPayment);
router.get('/user/:userId', orderController.getOrdersByUser);


module.exports = router;
