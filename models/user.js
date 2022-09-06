const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Provide username"],
  },
  email: {
    type: String,
    require: [true, "Provide email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Provide password"],
  },
});
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    "key",
    {
      expiresIn: "3d",
    }
  );
};
module.exports = mongoose.model("User", userSchema);
