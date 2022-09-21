import * as dotenv from 'dotenv';
dotenv.config();

export const Environments = {
  MongoUrl: process.env.MONGO_URL,
  JwtSecret: process.env.JWT_SECRET,
  Salt: +process.env.SALT
};
