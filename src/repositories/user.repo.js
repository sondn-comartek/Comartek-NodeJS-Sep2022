const User = require("../models/User.model");

const UserRepository = {
  create: async (name, email, password) => {
    return await User.create({ name, email, password });
  },

  getUserById: async (userId) => {
    return await User.findById(userId);
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updatePassword: async (userId, newPassword) => {
    return await User.updateOne(
      { _id: userId },
      { $set: { password: newPassword } },
      { new: true }
    );
  },
};

module.exports = UserRepository;
