require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./db/db');

const userRoutes = require('./route/userRoutes');
const bikeRoutes = require('./route/bike');
const contactRoutes = require('./route/contact');
const orderRoutes = require('./route/order');

const app = express();
const PORT = process.env.PORT || 5000;


connectDB()
  .then(() => sequelize.sync({ alter: true }))  
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Database connection error:', err));


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => res.send('Bike Rental API ✅'));
app.use('/api/user', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes); 


app.use((req, res) => {
  res.status(404).send('404 – Not Found');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
