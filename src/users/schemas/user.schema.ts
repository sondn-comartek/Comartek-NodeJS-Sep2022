import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop({ type: String, default: Role.Customer })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
