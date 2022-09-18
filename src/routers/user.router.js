const AuthService = require("../services/auth.service");

const userRouter = require("express").Router();

const Messages = {
  RegisterSuccess: "Đăng ký thành công",
  LoginSuccess: "Đăng nhập thành công",
};

userRouter.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const results = await AuthService.register(
      name,
      email,
      password,
      confirmPassword
    );

    if (results.error) {
      return res.status(400).json({ error: results.error });
    }

    return res.status(200).json({ message: Messages.RegisterSuccess, results });
  } catch (error) {
    return res.status(500).json(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await AuthService.login(email, password);

    if (results.error) {
      return res.status(400).json({ error: results.error });
    }

    return res.status(200).json({ message: Messages.LoginSuccess, results });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = userRouter;
