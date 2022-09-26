import { ObjectType, Field  } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatus } from './userStatus.enum';

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  collection: 'users'
})  
@ObjectType()
export class User {
  @Field({ name: 'userId', description: 'ID of user', nullable: false})
  @Prop({
    required: true  
  })
  userId: string;

  @Field({ name: 'userName', description: 'Username of user', nullable: false})
  @Prop({
    required: true
  })
  userName: string;

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

  @Field({ name: 'email', description: 'Email of user', nullable: false})
  @Prop({
    required: true
  })
  email: string;

  @Field({ name: 'password', description: 'Password of the account', nullable: false})
  @Prop({
    required: true
  })
  password: string;

  @Field({ name: 'phone', description: 'Phone number of user', nullable: false})
  @Prop({
    required: true
  })
  phone: string;  

  @Field({ name: 'status', description: 'Status of user', nullable: false})
  @Prop({
    required: true
  })
  status: UserStatus;
}


export const UserSchema = SchemaFactory.createForClass(User)