const { isMatchingPassword } = require("../helpers/password");
const { createToken } = require("../helpers/token");
const UserRepository = require("../repositories/user.repo");

const Errors = {
  PasswordNotMatch: "Mật khẩu không trùng khớp",
  PasswordIncorrect: "Mật khẩu không chính xác",
  RegisterdEmail: "Email đã được sử dụng",
  NotRegisteredEmail: "Email không chính xác",
};

const AuthService = {
  register: async (name, email, password, confirmPassword) => {
    if (!(await isMatchingPassword(password, confirmPassword))) {
      return {
        error: Errors.PasswordNotMatch,
      };
    }

    if (await UserRepository.getUserByEmail(email)) {
      return {
        error: Errors.RegisterdEmail,
      };
    }

    try {
      // const hashedPassword = await encryptPassword(password);
      const newUser = await UserRepository.create(name, email, password);
      return { user: newUser };
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        if (
          // await comparePassword(password, user.password)
          password === user.password
        ) {
          const token = createToken({ id: user._id });
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
