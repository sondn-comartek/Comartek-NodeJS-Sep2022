import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailerUser = process.env.MAILER_USER;
const mailerPwd = process.env.MAILER_PASSWORD;

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
