const { sendOtpToEmail } = require("../helpers/email");
const { createToken } = require("../helpers/token");
const UserRepository = require("../repositories/user.repo");
const PasswordValidator = require("../validator/password");

const Errors = {
  NotRegisterdEmail: "Email không tồn tại",
};

const PasswordService = {
  makeForgotPasswordRequest: async (email) => {
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
      await UserRepository.updatePassword(email, newPassword);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PasswordService;
