const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  createdTime: {
    type: Date,
    require: true,
  }, 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;