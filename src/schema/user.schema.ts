
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  firstname: string

  @Prop()
  lastname: string

  @Prop()
  email: string

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({default: 'inactive'})
  userstatus: string

  @Prop({default: 'customer'})
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);