const Message = require("../models/Message.model");

const MessageRepository = {
  create: async (userId, roomId, content) => {
    return await Message.create({ userId, roomId, content });
  },

  getMessagesOnRoom: async (roomId) => {
    return await Message.find({ roomId });
  },
};

module.exports = MessageRepository;
