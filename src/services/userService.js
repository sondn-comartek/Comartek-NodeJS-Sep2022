import db from "../models/index";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password) => {
  try {
    let hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    return e;
  }
};

let checkUserEmail = async (email) => {
  try {
    let user = await db.User.findOne({
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

let createNewUser = async (data) => {
  try {
    // Check email is exist??
    let isMailExist = await checkUserEmail(data.email);
    if (isMailExist === true) {
      return {
        errCode: 1,
        errMessage: "Your email address is already",
      };
    }
    // Check if the user comfirm password correctly
    if (data.password !== data.password_confirm) {
      return {
        errCode: 1,
        errMessage: "Please cofirm your password again",
      };
    }
    // Create a new user
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      username: data.username,
    });
    return {
      errCode: 0,
      message: "Create new user successfully",
    };
  } catch (e) {
    console.log(e);
  }
};

let createToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

let handleLogin = async (email, password) => {
  try {
    let isEmailExist = await checkUserEmail(email);
    if (!isEmailExist) {
      return {
        errCode: 1,
        message: `Your email isn't exist in system`,
      };
    }

    let user = await db.User.findOne({
      where: { email },
      raw: true,
      attributes: ["email", "password"],
    });
    if (!user) {
      return {
        errCode: 1,
        message: `User is not found`,
      };
    }

    let checkPassword = await bcrypt.compareSync(password, user.password);
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
        message: `Wrong password`,
      };
    }
  } catch (e) {
    return e;
  }
};

let sendMail = async (email, token) => {
  try {
    await nodemailer.createTestAccount(async (err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained, sending message...");

      console.log("account fake: ", account);

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
        html: "<p>You have got a link has token: </p>" + token,
      };

      await transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log("Message sent: " + info.response);
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          return true;
        }
      });
    });
  } catch (e) {
    return e;
  }
};

let forgotPassword = async (email) => {
  try {
    const token = await createToken(email);

    const sendMailSuccess = await sendMail(email, token);
    if (!sendMailSuccess) {
      return {
        errCode: 1,
        message: `Send email failed`,
      };
    } else {
      return {
        errCode: 1,
        message: `Send email successfully`,
        token,
      };
    }
  } catch (e) {
    return e;
  }
};

let resetPassword = async (token, newPassword) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return {
          errCode: 1,
          message: `Failed to authenticate token`,
        };
      } else {
        const email = decoded.email;
        let user = await db.User.findOne({
          where: { email },
          raw: false,
        });

        if (user) {
          let hashPassword = await hashUserPassword(newPassword);

          console.log("hashPassword", hashPassword);

          user.password = hashPassword;

          await user.save();
          return {
            errCode: 0,
            errMessage: `Reset password for user successfully`,
          };
        } else {
          return {
            errCode: 1,
            errMessage: `User not found`,
          };
        }
        console.log("decoded:", decoded);
      }
    });
  } catch (e) {
    return e;
  }
};

let updatePassword = async (data, token) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return {
          errCode: 1,
          message: `Failed to authenticate token`,
        };
      } else {
        let user = await db.User.findOne({
          where: { email: data.email },
          raw: false,
        });

        if (user) {
          let hashPassword = await hashUserPassword(data.newPassword);

          user.password = hashPassword;

          await user.save();
          return {
            errCode: 0,
            message: `Update password succedds`,
          };
        } else {
          return {
            errCode: 1,
            errMessage: `User not found`,
          };
        }
      }
    });
  } catch (e) {
    return e;
  }
};

module.exports = {
  createNewUser,
  handleLogin,
  forgotPassword,
  resetPassword,
  updatePassword,
};
