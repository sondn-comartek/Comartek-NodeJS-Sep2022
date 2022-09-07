const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OTPSchema = new Schema({
  emailToSend: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const OTP = model("otps", OTPSchema);

module.exports = OTP;
