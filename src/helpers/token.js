const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");

function createToken(payload) {
  return jwt.sign(payload, CONSTANTS.JwtSecret, {
    expiresIn: CONSTANTS.JwtExpirationTime,
  });
}

module.exports = { createToken };
