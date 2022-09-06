const User = require("../models/user");
const register = async (req, res) => {
  let { email, username, password, re_password } = req.body;
  if (password == re_password) {
    let created = await User.create({ email });
    return res.json({ status: "created", message: created });
  }
  return res.json({
    status: "create user fail",
    message: "password is not match re_password",
  });
};

module.exports = { register };
