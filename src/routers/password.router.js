const verifyOTP = require("../middlewares/verify-otp");
const verifyToken = require("../middlewares/verify-token");
const PasswordService = require("../services/password.service");

const passwordRouter = require("express").Router();

const Messages = {
  EmailHaveSend: "Mã OTP đã được gửi tới Email. Vui lòng kiểm tra",
  PasswordUpdateSuccess: "Thay đổi mật khẩu thành công",
};

passwordRouter.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const results = await PasswordService.makeForgotPasswordRequest(email);

    if (results.error) {
      return res.status(400).json({ error: results.error });
    }

    return res.status(200).json({
      message: Messages.EmailHaveSend,
      results,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

passwordRouter.post("/update", verifyToken, async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const results = await PasswordService.updatePassword(email, newPassword);

    if (results.error) {
      return res.status(400).json({ error: results.error });
    }

    return res
      .status(200)
      .json({ message: Messages.PasswordUpdateSuccess, results });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = passwordRouter;
