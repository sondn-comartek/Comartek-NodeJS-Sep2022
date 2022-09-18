const { Schema, model, default: mongoose } = require("mongoose");

const ChatRoomSchema = new Schema({
  usersOnRoom: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      default: [],
    },
  ],
});

const ChatRoom = model("chat_rooms", ChatRoomSchema);

module.exports = ChatRoom;
