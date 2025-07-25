const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const User = sequelize.define('User', {
  username:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  password:  { type: DataTypes.STRING, allowNull: false },
  role:      { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
