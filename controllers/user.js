const User = require("../models/user");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const nodemailer = require("nodemailer");
const register = async (req, res) => {
  let { email, username, password, re_password } = req.body;
  if (password == re_password) {
    try {
      let created = await User.create({
        email: email,
        username: username,
        password: password,
      });
      return res.status(StatusCodes.CREATED).json({ message: created });
    } catch (error) {
      return res.status(StatusCodes.CONFLICT).json({
        message: { message: ReasonPhrases.CONFLICT, error: error },
      });
    }
  }
  return res.status(StatusCodes.CONFLICT).json({
    message: "password is not match re_password",
  });
};
const login = async (req, res) => {
  let { email, password } = req.body;
  let userResult = await User.findOne({ email: email });
  let isCompare = await userResult.comparePassword(password);
  if (isCompare) {
    let token = userResult.createJWT();
    return res.status(StatusCodes.OK).json({ message: { token: token } });
  }
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: ReasonPhrases.UNAUTHORIZED });
};
const changePassword = async (req, res) => {
  let info = res.locals.user;
  if (password != re_password) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "password is not compare with re_password" });
  }
  let userUpdate = await User.findOneAndUpdate(
    { _id: id },
    { password: password }
  );
  if (userUpdate) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "update password success" });
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: StatusCodes.BAD_REQUEST });
};
const sendMailer = async (target, message) => {
  let testAccount = nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: (await testAccount).user, // generated ethereal user
      pass: (await testAccount).pass, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: (await testAccount).user, // sender address
    to: target, // list of receivers
    subject: "Hello Guy", // Subject line
    text: `New password ${message}`, // plain text body
    html: `<b>new password ${message}</b>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
const forgotPassword = async (req, res) => {
  let { email } = req.body;
  const makePass = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  let newPass = makePass(8);
  let userByEmail = await User.findOneAndUpdate(
    { email: email },
    { password: newPass }
  );
  if (userByEmail) {
    await sendMailer(userByEmail.email, newPass);
    return res.json({
      status: "success",
      message: { message: "update password success", password: newPass },
    });
  }
  res.json({ status: "fail", message: "forgot password fail" });
};
module.exports = { register, login, forgotPassword, changePassword };
