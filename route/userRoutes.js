const express = require('express');
const { register, login } = require('../userController/userController');
const authGuard = require('../middleware/authguard');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authGuard, (req, res) => {
  res.json({ message: 'Hello ' + req.user.email, role: req.user.role });
});

module.exports = router;
