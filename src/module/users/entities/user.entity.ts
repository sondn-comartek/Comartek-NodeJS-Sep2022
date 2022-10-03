import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'users'
})
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { name: 'username', description: 'Username of the user in the system', nullable: false })
  @Prop({
    required: true
  })
  username: string;

  @Field({ name: 'firstName', description: 'First name of user', nullable: false})
  @Prop({
    required: true
  })
  firstName: string;

  @Field({ name: 'lastName', description: 'Last name of user', nullable: false})
  @Prop({
    required: true
  })
  lastName: string;
  
  @Field(() => String, { name: 'userRole', nullable: false })
  @Prop({
    required: true
  })
  userRole: string;

  @Field(() => String, { name: 'phone', nullable: false })
  @Prop({
    required: true
  })
  phone: string;

  @Field(() => String, { name: 'email', nullable: false })
  @Prop({
    required: true
  })
  email: string;

  @Field(() => String, { name: 'password', nullable: false })
  @Prop({
    required: true
  })
  password: string;

  @Field(() => String, { name: 'city', nullable: false })
  @Prop({
    required: true
  })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);