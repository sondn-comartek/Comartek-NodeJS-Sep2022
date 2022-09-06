const mongoose = require("mongoose");
const connectDB = () => {
  mongoose.connect(
    `mongodb://localhost:27017/lecture`,
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
