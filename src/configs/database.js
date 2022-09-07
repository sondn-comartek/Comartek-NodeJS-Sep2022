const mongoose = require("mongoose");
const CONSTANTS = require("../constants");
const { MongoUrl } = CONSTANTS;

const connectDatabase = async () => {
  mongoose.connect(MongoUrl, (error) => {
    if (error) {
      throw error;
    } else {
      console.log("Connect to DB");
    }
  });
};

module.exports = connectDatabase;
