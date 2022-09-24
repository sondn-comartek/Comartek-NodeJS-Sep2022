import { ObjectType, Field } from '@nestjs/graphql';
import { UserStatus } from 'src/enums/user.status';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({
  collection: 'users',
  timestamps: true,
})
@ObjectType()
export class User {
  @Field(() => String, { description: 'username of user' })
  @Prop()
  username: string;
  @Field(() => String, { description: 'first name of user' })
  @Prop()
  first_name: string;
  @Field(() => String, { description: 'last name of user' })
  @Prop()
  last_name: string;
  @Field(() => String, { description: 'email of  user' })
  @Prop({
    unique: true,
    required: true,
  })
  email: string;
  @Field(() => String, { description: 'password of user' })
  @Prop()
  password: string;
  @Field(() => String, { description: 'phone number of user' })
  @Prop()
  phone: string;
  @Field(() => UserStatus, {
    description: 'status of user in system',
    defaultValue: UserStatus.inactive,
  })
  @Prop()
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
