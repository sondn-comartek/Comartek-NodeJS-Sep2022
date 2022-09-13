const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
const db = require('./sequelize')
const mongoose = require('mongoose');


const init = async () => {
  // init config varibles
  dotenv.config()
  // init sequelize
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      pool: {
        max: parseInt(process.env.DATABASE_POOL)
      }
    },
  );
  await mongoose.connect('mongodb://localhost:27017/test');
  if(mongoose.connection.readyState) 
    console.log('connected to mongo database')
  else 
    console.log('fail to connect with mongo db')

}

module.exports = init