const { checkValidOtpExpirationTime } = require("../helpers/otp");
const OTPRepostiroy = require("../repositories/otp.repo");

const OTPErrors = {
  NotCorrect: "OTP does not correct",
  NotIncluded: "OTP not found in request",
  Expired: "OTP is already expired",
};

// Check if OTP is existed on DB and not expired
const verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({ error: OTPErrors.NotIncluded });
  }

  const otpOnDatabase = await OTPRepostiroy.findByCode(otp);
  if (!otpOnDatabase) {
    return res.status(404).json({ error: OTPErrors.NotCorrect });
  }

  const isValidOtpExpirationTime = await checkValidOtpExpirationTime(
    otpOnDatabase
  );
  if (!isValidOtpExpirationTime) {
    return res.status(400).json({ erorr: OTPErrors.Expired });
  }

  if (otpOnDatabase.isVerified) {
    return res.status(400).json({ error: "Mã OTP đã được sử dụng" });
  }

  otpOnDatabase.isVerified = true;
  await otpOnDatabase.save();

  next();
};

module.exports = verifyOTP;
