const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bikeController = require('../userController/bikeController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/bikes/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// === ROUTES ===

// Add new bike
router.post('/add', upload.single('image'), bikeController.addBike);

// Get all bikes
router.get('/', bikeController.getAllBikes);

// Delete a bike by ID
router.delete('/:id', bikeController.deleteBike); // ✅ NEW DELETE ROUTE

module.exports = router;
