const transporter = require("../configs/nodemailer");
const CONSTANTS = require("../constants");

async function sendOtpToEmail(receiveAddress, otpCode) {
  const mailOptions = {
    from: CONSTANTS.Email,
    to: receiveAddress,
    subject: "OTP to reset password",
    html: `<h1>OTP to reset password: <strong>${otpCode}</strong></h1>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }

    console.log({ new_mail: info });
  });
}

module.exports = { sendOtpToEmail };
