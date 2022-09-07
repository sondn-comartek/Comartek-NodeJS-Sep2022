import db from "../models/index";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check email is exist??
      let isMailExist = await checkUserEmail(data.email);
      if (isMailExist === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email address is already",
        });
      }

      // Check if the user comfirm password correctly
      if (data.password !== data.password_confirm) {
        resolve({
          errCode: 1,
          errMessage: "Please cofirm your password again",
        });
      }

      // Create a new user
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        username: data.username,
      });
      resolve({
        errCode: 0,
        message: "Create new user successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isEmailExist = await checkUserEmail(email);
      if (!isEmailExist) {
        resolve({
          errCode: 1,
          message: `Your email isn't exist in system`,
        });
      }

      let user = await db.User.findOne({
        where: { email },
        raw: true,
        attributes: ["email", "password"],
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: `User is not found`,
        });
      }

      let checkPassword = await bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const token = await createToken(user.email);
        resolve({
          errCode: 0,
          message: `Login successfully`,
          user,
          token,
        });
      } else {
        resolve({
          errCode: 1,
          message: `Wrong password`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendMail = async (email) => {
  const token = await createToken(email);

  nodemailer.createTestAccount(async (err, account) => {
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }

    console.log("Credentials obtained, sending message...");

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    const mainOptions = {
      from: account.user,
      to: "hoangdhh1@gmail.com",
      subject: "Test Nodemailer",
      text: "You recieved message from ",
      html: "<p>You have got a link has token: </p>" + token,
    };

    await transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Message sent: " + info.response);
        return true;
      }
    });
  });
};

let forgotPassword = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendMailSuccess = await sendMail(email);
      if (!sendMailSuccess) {
        resolve({
          errCode: 1,
          message: `Send email failed`,
        });
      } else {
        resolve({
          errCode: 1,
          message: `Send email successfully`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updatePassword = (data, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          resolve({
            errCode: 1,
            message: `Failed to authenticate token`,
          });
        } else {
          let user = await db.User.findOne({
            where: { email: data.email },
            raw: false,
          });

          if (user) {
            let hashPassword = await hashUserPassword(data.new_password);

            user.password = hashPassword;

            await user.save();
            resolve({
              errCode: 0,
              message: `Update password succedds`,
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
  updatePassword,
};
