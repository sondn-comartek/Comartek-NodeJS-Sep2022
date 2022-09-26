import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from '../enums/status.enum';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ type: String, default: UserStatus.Active })
  status: UserStatus;

  @Prop({ type: String, default: Role.Customer })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
