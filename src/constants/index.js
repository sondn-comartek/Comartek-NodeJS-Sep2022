require("dotenv").config();

const CONSTANTS = {
  Port: process.env.PORT || 8000,
  MongoUrl: process.env.MONGO_URL,
  BcryptSalt: parseInt(process.env.BCRYPT_SALT),
  JwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_HERE",
  JwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  NodemailerTransportOptions: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  Email: process.env.EMAIL,
  OtpExpirationTime: process.env.OTP_EXPIRATION_TIME,
};

module.exports = CONSTANTS;
