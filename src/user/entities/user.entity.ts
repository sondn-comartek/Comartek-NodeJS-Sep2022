import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/enums/roles.enum';
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
  @Field(() => Role, {
    description: 'role of account',
    defaultValue: Role.user,
  })
  @Prop({ required: true })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
