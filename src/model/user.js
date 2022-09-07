const { sequelize } = require('../config/sequelize')
const {DataTypes} = require('sequelize');
const UserModel =  sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = UserModel