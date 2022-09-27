import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from 'src/enums/roles.enum';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => String, { description: 'Email of User' })
  @Prop({ required: true, unique: true })
  email: string;
  @Field(() => String, { description: 'password of account' })
  @Prop({ required: true })
  password: string;
  @Field(() => Roles, {
    description: 'role of account',
    defaultValue: Roles.user,
  })
  @Prop({ required: true })
  role: Roles;
}
export const UserSchema = SchemaFactory.createForClass(User);
