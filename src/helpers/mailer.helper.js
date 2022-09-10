import nodemailer from "nodemailer";
import dotenv from "dotenv";
import constants from "../utils/constants.js";

dotenv.config();

const mailerUser = constants.mailerUser ;
const mailerPwd = constants.mailerPwd ;

const createTransporter = async () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailerUser,
      pass: mailerPwd,
    },
  });
}

const sendMail = async (mailUserOpts) => {
  const transporter = await createTransporter()
  return await transporter.sendMail({
    from: mailerUser,
    ...mailUserOpts,
  });
};

export { sendMail };
