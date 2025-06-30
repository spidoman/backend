const Order = require('../models/Order');
const Bike = require('../models/Bike');
const User = require('../models/User');


exports.placeOrder = async (req, res) => {
  const { userEmail, bikeId, hours, totalAmount, paymentMethod, status, paymentRef } = req.body;

  if (!userEmail || !bikeId || !hours || !totalAmount || !paymentMethod || !status)
    return res.status(400).json({ message: 'Missing fields' });

  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const finalPaymentRef = paymentMethod === 'cod' ? 'COD' : (paymentRef || null);

    const order = await Order.create({
      userId: user.id,
      bikeId,
      hours,
      totalAmount,
      paymentMethod,
      status,
      paymentRef: finalPaymentRef,
    });

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Order failed' });
  }
};

exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        { model: Bike },
        { model: User, attributes: ['email'] }
      ]
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Bike },
        { model: User, attributes: ['email'] }
      ]
    });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const valid = ['cancel', 'accept', 'decline'];

  if (!valid.includes(action)) return res.status(400).json({ message: 'Invalid action' });

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (action === 'cancel') order.status = 'cancelled';
    if (action === 'accept') order.status = 'accepted';
    if (action === 'decline') order.status = 'declined';

    await order.save();
    res.json({ message: 'Status updated', order });
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
};
