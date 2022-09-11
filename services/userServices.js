const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  return hashPass;
};
const comparePassword = async (candidatePassword, password) => {
  const isMatch = await bcrypt.compare(candidatePassword, password);
  return isMatch;
};
const signToken = (info) => {
  const key = process.env.KEY || "secret";
  const expiresIn = process.env.EXPIRESIN || "3d";
  const token = jwt.sign(info, key, { expiresIn: expiresIn });
  return token;
};
const signPasswordRandom = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  signPasswordRandom,
};
