const User = require("../models/user");
const register = async (req, res) => {
  let { email, username, password, re_password } = req.body;
  if (password == re_password) {
    let created = await User.create({
      email: email,
      username: username,
      password: password,
    });
    return res.json({ status: "created", message: created });
  }
  return res.json({
    status: "fail",
    message: "password is not match re_password",
  });
};
const login = async (req, res) => {
  let { email, password } = req.body;
  let userResult = await User.findOne({ email: email });
  let isCompare = await userResult.comparePassword(password);
  if (isCompare) {
    let token = userResult.createJWT();
    return res.json({ status: "success", message: { token: token } });
  }
  res.json({ status: "fail", message: "login fail" });
};
module.exports = { register, login };
