import * as dotenv from 'dotenv';
dotenv.config();

export const Environments = {
  MongoUrl: process.env.MONGO_URL,
  JwtSecret: process.env.JWT_SECRET,
  Salt: +process.env.SALT,
  EmailPass: process.env.EMAIL_PASS,
  CloudName: process.env.CLOUD_NAME,
  CloudApiKey: process.env.CLOUD_API_KEY,
  CloudApiSecret: process.env.CLOUD_API_SECRET,
};
