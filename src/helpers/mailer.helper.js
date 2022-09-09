import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailerUser = process.env.MAILER_USER;
const mailerPwd = process.env.MAILER_PASSWORD;

const sendMail = async (mailUserOpts) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailerUser,
      pass: mailerPwd,
    },
  });
  return await transporter.sendMail({
    from: mailerUser,
    ...mailUserOpts,
  });
};

export { sendMail };
