const bcrypt = require("bcryptjs");
const CONSTANTS = require("../constants");

async function isMatchingPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function encryptPassword(password) {
  return bcrypt.hashSync(password, CONSTANTS.BcryptSalt);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { isMatchingPassword, encryptPassword, comparePassword };
