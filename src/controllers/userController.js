import userService from "../services/userService";

const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),

  password: Joi.string(),

  passwordConfirm: Joi.ref("password"),

  token: Joi.string(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const handleRegister = async (req, res) => {
  const { email, password, username, passwordConfirm } = req.body;

  if (!email || !password || !username || !passwordConfirm) {
    return res.status(422).json({
      errCode: 1,
      message: "Please enter all required information",
    });
  }

  try {
    await schema.validateAsync({ email, password, username, passwordConfirm });
  } catch (error) {
    return res.status(422).json({
      errCode: 1,
      message: "Please enter information correctly",
    });
  }

  const message = await userService.createNewUser(
    email,
    password,
    username,
    passwordConfirm
  );
  return res.status(200).json(message);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      errCode: 1,
      message: "Missing email or password",
    });
  }

  try {
    await schema.validateAsync({ email, password });
  } catch (error) {
    return res.status(422).json({
      errCode: 1,
      message: "Please enter email or password correctly",
    });
  }

  const response = await userService.handleLogin(email, password);
  return res.status(200).json(response);
};

const handleForgotPassword = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(422).json({
      errCode: 1,
      message: "Missing email",
    });
  }

  try {
    await schema.validateAsync({ email });
  } catch (error) {
    return res.status(422).json({
      errCode: 1,
      message: "Please enter email correctly",
    });
  }

  const response = await userService.forgotPassword(email);
  return res.status(200).json(response);
};

const handleResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(403).json({
      errCode: 1,
      message: "Missing token",
    });
  }
  if (!newPassword) {
    return res.status(422).json({
      errCode: 1,
      message: "Missing new password",
    });
  }

  const response = await userService.resetPassword(token, newPassword);
  return res.status(200).json(response);
};

module.exports = {
  handleRegister,
  handleLogin,
  handleForgotPassword,
  handleResetPassword,
};
