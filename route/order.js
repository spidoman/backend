const express = require('express');
const router = express.Router();
const ctrl = require('../userController/orderController');

router.post('/place', ctrl.placeOrder);
router.get('/user/email/:email', ctrl.getOrdersByEmail);
router.get('/', ctrl.getAllOrders);
router.put('/:id/status', ctrl.updateStatus);

module.exports = router;
