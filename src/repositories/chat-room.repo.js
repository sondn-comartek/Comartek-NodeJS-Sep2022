const ChatRoom = require("../models/ChatRoom.model");

const ChatRoomRepository = {
  create: async () => {
    return await ChatRoom.create({});
  },

  getChatRoomById: async (roomId) => {
    return await ChatRoom.findById(roomId);
  },
};

module.exports = ChatRoomRepository;
