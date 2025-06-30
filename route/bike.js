const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bikeController = require('../userController/bikeController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/bikes/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), bikeController.addBike);

router.get('/', bikeController.getAllBikes);

router.delete('/:id', bikeController.deleteBike); 

module.exports = router;
