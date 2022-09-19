import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User;



@Schema()
export class User extends Document {
  @Prop()
  username: string
  

  @Prop()
  password: string

  @Prop()
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);