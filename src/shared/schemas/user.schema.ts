import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserRole, UserStatus } from '../enums';

@Schema({
  collection: 'users',
  _id: false,
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    default: new mongoose.Types.ObjectId(),
  })
  id: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  userName: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: UserStatus,
    required: true,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Prop({
    type: UserRole,
    required: true,
    default: UserRole.User,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User)
