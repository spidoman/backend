const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); 

const ContactMessage = sequelize.define('ContactMessage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.TEXT,
}, {
  timestamps: true,
});

module.exports = ContactMessage;
