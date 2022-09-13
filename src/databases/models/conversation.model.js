import mongoose from "mongoose";

const Schema = mongoose.Schema;

const conversationModel = new Schema(
  {
    members: Array ,
    messages: [
      {
        sender: String ,
        content: String,
      },{ timestamps : true }
    ],
    total_message: Number,
  }, {timestamps : true },
);

export default mongoose.model("conversation", conversationModel);
