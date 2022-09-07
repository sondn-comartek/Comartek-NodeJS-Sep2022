const CONSTANTS = require("../constants");
const { addDays } = require("./date");

async function generateOTP() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const otpLength = 6;
  let code = "";
  for (let i = 0; i < otpLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

async function checkValidOtpExpirationTime(otp) {
  const current = new Date();
  const { createdAt } = otp;
  if (addDays(new Date(createdAt), CONSTANTS.OtpExpirationTime) - current > 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = { generateOTP, checkValidOtpExpirationTime };
