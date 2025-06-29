const Order = require('../route/order');
const Bike = require('../models/Bike')
// or correct path to your models

exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Bike }]  // assuming Bike is related to Order
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { orderId, paymentRef } = req.body;

    if (!orderId || !paymentRef) {
      return res.status(400).json({ message: 'Order ID and payment reference are required' });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'paid';
    order.paymentReference = paymentRef;
    await order.save();

    res.json({ message: 'Payment confirmed', order });
  } catch (err) {
    console.error('Payment confirmation failed:', err);
    res.status(500).json({ message: 'Payment update failed', error: err.message });
  }
};
