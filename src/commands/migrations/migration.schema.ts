import { Schema } from 'mongoose';

export const MigrationSchema = new Schema({
  key: String,
  createdAt: Date,
});
