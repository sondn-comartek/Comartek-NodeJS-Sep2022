import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from '../enums/status.enum';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../enums/role.enum';
import { ObjectType, Field } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  username: string;

  @Field(() => String)
  @Prop({ required: true })
  firstName: string;

  @Field(() => String)
  @Prop({ required: true })
  lastName: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  password: string;

  @Field(() => String)
  @Prop({ required: true })
  phone: string;

  @Field(() => String)
  @Prop({ type: String, default: UserStatus.Active, required: true })
  status: UserStatus;

  @Field(() => String)
  @Prop({ type: String, default: Role.Customer, required: true })
  role: Role;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  createdAt: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
