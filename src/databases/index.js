import mongoose from "mongoose";
import { env } from "../utils/constants.js";

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${env.mongoUserName}:${env.mongoPassword}@dungbt.fuhvpgs.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected database");
  } catch (err) {
    console.log(`Connect database failed >>> ${err}`);
  }
};

export default connectDb;
