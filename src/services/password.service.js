const { sendOtpToEmail } = require("../helpers/email");
const { createToken } = require("../helpers/token");
const OTPRepostiroy = require("../repositories/otp.repo");
const UserRepository = require("../repositories/user.repo");
const EmailValidator = require("../validator/email");
const PasswordValidator = require("../validator/password");

const Errors = {
  NotRegisterdEmail: "Email không chính xác",
};

const PasswordService = {
  makeForgotPasswordRequest: async (email) => {
    await EmailValidator.validateAsync({ email });

    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        const token = createToken({ email });

        await sendOtpToEmail(email, token);

        return {
          success: true,
        };
      }
      return { error: Errors.NotRegisterdEmail };
    } catch (error) {
      throw error;
    }
  },

  updatePassword: async (email, newPassword) => {
    await PasswordValidator.validateAsync({ password: newPassword });

    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        return { error: Errors.NotRegisterdEmail };
      }
      const updated = await UserRepository.updatePassword(email, newPassword);
      return { updated };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PasswordService;
