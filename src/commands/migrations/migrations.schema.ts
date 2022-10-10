import * as mongoose from 'mongoose';

export const MigrationSchema = new mongoose.Schema({
  key: String,
  createdAt: String,
});
