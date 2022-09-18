const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const MessageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "chat_rooms",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("messages", MessageSchema);

module.exports = Message;
