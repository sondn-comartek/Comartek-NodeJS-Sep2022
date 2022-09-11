const mongoose = require("mongoose");
const connectDB = (url) => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log(`db is connected`);
    }
  );
};

module.exports = connectDB;
