import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoleEnum } from '../enums/user-role.enum';

@ObjectType()
@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly userName: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly email: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly password: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly fullName: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly phoneNumber: string;

  @Field(() => UserRoleEnum)
  @Prop({
    type: String,
    required: true,
    default: UserRoleEnum.USER,
  })
  readonly role: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
