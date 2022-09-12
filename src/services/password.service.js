const { sendOtpToEmail } = require("../helpers/email");
const { createToken } = require("../helpers/token");
const UserRepository = require("../repositories/user.repo");
const PasswordValidator = require("../validator/password");
const { encryptPassword } = require("../helpers/password");

const Errors = {
  UserNotFound: "User không tồn tại",
};

const PasswordService = {
  makeForgotPasswordRequest: async (email) => {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        const token = createToken({ userId: user._id });
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

  updatePassword: async (userId, newPassword) => {
    const passwordValidatorInfo = PasswordValidator.validate({
      password: newPassword,
    });
    if (passwordValidatorInfo?.error) {
      return { error: passwordValidatorInfo?.error?.details[0]?.message };
    }

    try {
      const hashedPassword = await encryptPassword(newPassword);
      await UserRepository.updatePassword(userId, hashedPassword);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PasswordService;
