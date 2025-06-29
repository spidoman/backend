const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Bike = sequelize.define('Bike', {
  name:   { type: DataTypes.STRING, allowNull: false },
  price:  { type: DataTypes.INTEGER, allowNull: false },
  image:  { type: DataTypes.STRING }, // saved filename
}, {
  tableName: 'bikes',
  timestamps: true,
});

module.exports = Bike;
