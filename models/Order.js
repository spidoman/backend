const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const User = require('./User');
const Bike = require('../models/Bike');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: DataTypes.INTEGER,
  bikeId: DataTypes.INTEGER,
  hours: DataTypes.INTEGER,
  totalAmount: DataTypes.FLOAT,
  paymentMethod: DataTypes.STRING,   
  status: DataTypes.STRING,          
  paymentRef: DataTypes.STRING,      
}, { timestamps: true });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Bike, { foreignKey: 'bikeId' });

module.exports = Order;
