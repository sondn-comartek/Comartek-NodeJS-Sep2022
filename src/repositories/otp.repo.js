const { generateOTP } = require("../helpers/otp");
const OTP = require("../models/OTP.model");

const OTPRepostiroy = {
  create: async (email) => {
    const code = await generateOTP();
    return await OTP.create({ emailToSend: email, code });
  },

  findByCode: async (code) => {
    return await OTP.findOne({ code });
  },
};

module.exports = OTPRepostiroy;
