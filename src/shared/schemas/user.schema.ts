import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserRole, UserStatus } from '../enums';

@Schema({
  collection: 'users',
  timestamps: true,
})
@ObjectType()
export class User {
  @Field(() => String)
  @Prop({
    type: String,
    unique: true,
    required: true,
    default: () => uuidv4(),
  })
  id: string;

  @Field(() => String)
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  userName: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Field(() => String)
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    default: UserStatus.Inactive,
  })
  status: UserStatus;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    default: UserRole.User,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
