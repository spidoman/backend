// controllers/contactController.js

const ContactMessage = require('../models/ContactMessage');

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: 'Your message has been received successfully!',
      data: newMessage,
    });
  } catch (err) {
    console.error('❌ Error creating contact message:', err);
    return res.status(500).json({
      message: 'Something went wrong while saving your message.',
      error: err.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact/messages
// @access  Admin only
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    return res.status(500).json({
      message: 'Failed to fetch contact messages.',
      error: err.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await ContactMessage.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete message', error: err.message });
  }
};

