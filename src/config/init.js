const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
const db = require('./sequelize')
const mongoose = require('mongoose');


const init = async () => {
  // init config varibles
  dotenv.config()
  mongoose.connect(process.env.MONGODB);
  if(mongoose.connection.readyState) 
    console.log('connected to mongo database')
  else 
    console.log('fail to connect with mongo db')

}

module.exports = init