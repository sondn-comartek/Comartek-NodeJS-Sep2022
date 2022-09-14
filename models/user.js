const mongoose = require("mongoose");
const {
  hashPassword,
  comparePassword,
  signToken,
} = require("../services/userServices");
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
  this.password = await hashPassword(this.password);
});
userSchema.pre("findOneAndUpdate", async function () {
  const data = this.getUpdate();
  data.password = await hashPassword(data.password);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await comparePassword(candidatePassword, this.password);
  return isMatch;
};
userSchema.methods.createJWT = function () {
  return signToken({
    id: this._id,
    username: this.username,
  });
};
module.exports = mongoose.model("User", userSchema);
