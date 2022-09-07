const User = require("../models/User.model");

const UserRepository = {
  create: async (name, email, password) => {
    return await User.create({ name, email, password });
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updatePassword: async (email, newPassword) => {
    return await User.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );
  },
};

module.exports = UserRepository;
