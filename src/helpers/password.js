const bcrypt = require("bcryptjs");
const CONSTANTS = require("../constants");

async function isMatchingPassword(password, confirmPassword) {
  return password === confirmPassword;
}

async function encryptPassword(password) {
  if (!password instanceof String) {
    throw new Error("Input password not a String");
  }

  if (password.length === 0) {
    throw new Error("Empty String error");
  }

  return bcrypt.hashSync(password, CONSTANTS.BcryptSalt);
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { isMatchingPassword, encryptPassword, comparePassword };
