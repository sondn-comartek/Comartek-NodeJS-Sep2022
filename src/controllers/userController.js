import userService from "../services/userService";

const Joi = require("joi");

const handleRegister = async (req, res) => {
  const { email, password, username, passwordConfirm } = req.body;

  const schemaRegister = Joi.object({
    username: Joi.string().min(3).max(30).required(),

    password: Joi.string().required(),

    passwordConfirm: Joi.ref("password"),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  try {
    await schemaRegister.validateAsync({
      email,
      password,
      username,
      passwordConfirm,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(422).json({
      errCode: 1,
      errMessage: `Invalid input: ${error.message}`,
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

  const schemaLogin = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    password: Joi.string().required(),
  });

  try {
    await schemaLogin.validateAsync({ email, password });
  } catch (error) {
    console.log(error.message);
    return res.status(422).json({
      errCode: 1,
      errMessage: `Invalid input: ${error.message}`,
    });
  }

  const response = await userService.handleLogin(email, password);
  return res.status(200).json(response);
};

const handleForgotPassword = async (req, res) => {
  const email = req.body.email;

  const schemaForgotPassword = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  try {
    await schemaForgotPassword.validateAsync({ email });
  } catch (error) {
    console.log(error.message);
    return res.status(422).json({
      errCode: 1,
      errMessage: `Invalid input: ${error.message}`,
    });
  }

  const response = await userService.forgotPassword(email);
  return res.status(200).json(response);
};

const handleResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const schemaResetPassword = Joi.object({
    token: Joi.string().required(),

    newPassword: Joi.string().required(),
  });

  try {
    await schemaResetPassword.validateAsync({
      token,
      newPassword,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(422).json({
      errCode: 1,
      errMessage: `Invalid input: ${error.message}`,
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
