import db from "../models/index";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    return e;
  }
};

const checkUserEmail = async (email) => {
  try {
    const user = await db.User.findOne({
      where: { email },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return e;
  }
};

const createNewUser = async (email, password, username) => {
  try {
    // Check email is exist??
    const isMailExist = await checkUserEmail(email);
    if (isMailExist === true) {
      return {
        errCode: 1,
        errMessage: "Your email address is already",
      };
    }

    // Create a new user
    const hashPasswordFromBcrypt = await hashUserPassword(password);
    await db.User.create({
      email: email,
      password: hashPasswordFromBcrypt,
      username: username,
    });
    return {
      errCode: 0,
      message: "Create new user successfully",
    };
  } catch (e) {
    console.log(e);
  }
};

const createToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const handleLogin = async (email, password) => {
  try {
    const isEmailExist = await checkUserEmail(email);
    if (!isEmailExist) {
      return {
        errCode: 1,
        errMessage: `Your email isn't exist in system`,
      };
    }

    const user = await db.User.findOne({
      where: { email },
      raw: true,
      attributes: ["email", "password"],
    });

    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      const token = await createToken(user.email);
      return {
        errCode: 0,
        message: `Login successfully`,
        user,
        token,
      };
    } else {
      return {
        errCode: 1,
        errMessage: `Wrong password`,
      };
    }
  } catch (e) {
    return e;
  }
};

const sendMail = async (email, token) => {
  try {
    await nodemailer.createTestAccount(async (err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained, sending message...");

      // console.log("account fake: ", account);

      // create reusable transporter object using the default SMTP transport
      const transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });

      const mainOptions = {
        from: account.user,
        to: email,
        subject: "Test Nodemailer",
        text: "You recieved message from ",
        html: `<p>You have got a link has token: </p>` + token,
      };

      await transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const forgotPassword = async (email) => {
  try {
    const isEmailExist = await checkUserEmail(email);
    if (!isEmailExist) {
      return {
        errCode: 1,
        errMessage: `Your email isn't exist in system`,
      };
    }

    const token = await createToken(email);

    await sendMail(email, token);
    return {
      errCode: 0,
      message: `Send email successfully`,
      token,
    };
  } catch (e) {
    console.log(e);
    return {
      errCode: 1,
      message: `Send email failed`,
    };
  }
};

const resetPassword = async (token, newPassword) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          resolve({
            errCode: 1,
            errMessage: `Failed to authenticate token`,
          });
        } else {
          const email = decoded.email;
          const user = await db.User.findOne({
            where: { email },
            raw: false,
          });

          if (user) {
            const hashPassword = await hashUserPassword(newPassword);

            user.password = hashPassword;

            await user.save();
            resolve({
              errCode: 0,
              message: `Reset password for user successfully`,
            });
          } else {
            resolve({
              errCode: 1,
              errMessage: `User not found`,
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  handleLogin,
  forgotPassword,
  resetPassword,
};
