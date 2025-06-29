// models/ContactMessage.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // ✅ Destructure `sequelize` from the exported object

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
