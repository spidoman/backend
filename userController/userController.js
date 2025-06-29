const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, email, password, adminCode } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email in use' });

  const role = adminCode === process.env.ADMIN_SECRET_CODE ? 'admin' : 'user';
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashed, role });
  res.status(201).json({ message: 'Registered', id: user.id, role });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user.email);
    console.log('Stored hashed password:', user.password);

    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: '12h' }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed, try again.' });
  }
};
