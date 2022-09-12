import nodemailer from "nodemailer";
import { errors , env } from "../utils/constants.js";


const createTransporter = async () => {
  return  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.mailerUser,
      pass: env.mailerPwd,
    },
  });
}

const sendMail = async (mailUserOpts) => {
  const transporter = await createTransporter()
  return await transporter.sendMail({
    from: env.mailerUser,
    ...mailUserOpts,
  });
};

export { sendMail };
