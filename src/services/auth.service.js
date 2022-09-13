const {
  isMatchingPassword,
  encryptPassword,
  comparePassword,
} = require("../helpers/password");
const { createToken } = require("../helpers/token");
const UserRepository = require("../repositories/user.repo");
const EmailValidator = require("../validator/email");
const PasswordValidator = require("../validator/password");

const Errors = {
  PasswordNotMatch: "Mật khẩu không trùng khớp",
  PasswordIncorrect: "Mật khẩu không chính xác",
  RegisterdEmail: "Email đã được sử dụng",
  NotRegisteredEmail: "Email không chính xác",
  NotEnoughInfo: "Hãy điền đẩy đủ thông tin",
};

const AuthService = {
  register: async (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
      return {
        error: Errors.NotEnoughInfo,
      };
    }

    const emailValidatorInfo = EmailValidator.validate({ email });
    if (emailValidatorInfo?.error) {
      return { error: emailValidatorInfo?.error?.details[0]?.message };
    }

    if (!(await isMatchingPassword(password, confirmPassword))) {
      return {
        error: Errors.PasswordNotMatch,
      };
    }

    const passwordValidatorInfo = PasswordValidator.validate({ password });
    if (passwordValidatorInfo?.error) {
      return { error: passwordValidatorInfo?.error?.details[0]?.message };
    }

    if (await UserRepository.getUserByEmail(email)) {
      return {
        error: Errors.RegisterdEmail,
      };
    }

    try {
      const hashedPassword = await encryptPassword(password);
      const newUser = await UserRepository.create(name, email, hashedPassword);
      return { user: newUser };
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({ userId: user._id });
          return { token, user };
        }
        return {
          error: Errors.PasswordIncorrect,
        };
      }
      return {
        error: Errors.NotRegisteredEmail,
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = AuthService;
