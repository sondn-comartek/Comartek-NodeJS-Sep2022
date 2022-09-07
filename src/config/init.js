const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
const db = require('./sequelize')

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
  db.init(sequelize)
  await sequelize.authenticate().then(() => {
    console.log('Connection to Database has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
}

module.exports = init