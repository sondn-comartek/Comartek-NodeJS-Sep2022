const { sendOtpToEmail } = require("../helpers/email");
const { createToken } = require("../helpers/token");
const OTPRepostiroy = require("../repositories/otp.repo");
const UserRepository = require("../repositories/user.repo");

const Errors = {
  NotRegisterdEmail: "Email không chính xác",
};

const PasswordService = {
  makeForgotPasswordRequest: async (email) => {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        // const otp = await OTPRepostiroy.create(email);

        // Generate a jwt
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
