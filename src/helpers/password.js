const bcrypt = require("bcryptjs");
const CONSTANTS = require("../constants");

async function isMatchingPassword(password, confirmPassword) {
  return password === confirmPassword;
}

async function encryptPassword(password) {
  return bcrypt.hashSync(password, CONSTANTS.BcryptSalt);
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { isMatchingPassword, encryptPassword, comparePassword };
