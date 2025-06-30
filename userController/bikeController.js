const Bike = require('../models/Bike');
const fs = require('fs');
const path = require('path');

exports.addBike = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const bike = await Bike.create({
      name,
      price: parseInt(price, 10),
      image: req.file.filename,
    });

    res.status(201).json({ message: 'Bike added', bike });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.findAll();
    res.status(200).json(bikes);
  } catch (err) {
    console.error('Fetching bikes failed:', err);
    res.status(500).json({ message: 'Failed to fetch bikes', error: err.message });
  }
};

exports.deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await Bike.findByPk(id);

    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    const imagePath = path.join(__dirname, '..', 'uploads', 'bikes', bike.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await bike.destroy();
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (err) {
    console.error('Delete bike error:', err);
    res.status(500).json({ message: 'Failed to delete bike', error: err.message });
  }
};
