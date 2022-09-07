import userService from "../services/userService";

let handleRegister = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(422).json({
      errCode: 1,
      message: "Missing email or password",
    });
  }

  let response = await userService.handleLogin(email, password);
  return res.status(200).json(response);
};

let handleForgotPassword = async (req, res) => {
  let email = req.body.email;

  if (!email) {
    return res.status(422).json({
      errCode: 1,
      message: "Missing email",
    });
  }

  let response = await userService.forgotPassword(email);
  return res.status(200).json(response);
};

let handleUpdatePassword = async (req, res) => {
  let data = req.body;
  const token = req.headers["authorization"];
  if (token == null) {
    return res.status(403).json({
      errCode: 1,
      message: "No token is provided",
    });
  }
  let message = await userService.updatePassword(data, token);
  return res.status(200).json(message);
};

module.exports = {
  handleRegister,
  handleLogin,
  handleForgotPassword,
  handleUpdatePassword,
};
