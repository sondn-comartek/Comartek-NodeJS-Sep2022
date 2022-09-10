import { registerService } from "../services/register.service.js";

import { loginService } from "../services/login.service.js";

import messages from "../utils/messages.js"

const register = async (req, res, next) => {
  try {
    await registerService(req.body);
    return res.status(201).json({
      success: true,
      message: messages.registerSuccess,
    });
  } catch (err) {
    next({
      err,
      message: messages.registerFail,
      status: 403,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);
    return res.status(200).json({
      success: true,
      message: messages.loginSuccess,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next({
      err,
      message: messages.loginFail,
      status: 401,
    });
  }
};

export { register, login };
