import { Directive, Field, ID, ObjectType , InputType} from '@nestjs/graphql';

import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose'
import { UserRole, UserStatus } from '../types';


export type UserDocument = User & Document

@ObjectType({ description : 'user'})
@Schema({timestamps : true })
export class User extends Document {
    @Prop({
        isRequired : true ,
        unique : true
    })
    @Field( type => ID )
    userid : string 

    @Prop({
        isRequired : true ,
        unique : true
    })
    @Field()
    username : string 

    @Prop({default : null })
    @Field({ nullable : true})
    firstname? : string 

    @Prop({default : null })
    @Field({ nullable : true})
    lastname? : string 

    @Prop({
        isRequired : true ,
        unique : true
    })
    @Field()
    email : string 

    @Prop({isRequired : true})
    hash : string

    @Prop({default : null })
    @Field({ nullable : true})
    phone? : string

    @Prop({default : UserStatus.ACTIVE })
    @Field(() => UserStatus)
    status? : UserStatus 

    @Prop({default : UserRole.CUSTOMER})
    @Field(() => UserRole )
    role? : UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)


// * User ID
// * Username
// * First name
// * Last name
// * Email (must be in correct format)
// * Password (must have at least 8 characters, 1 capitalized letter & 1 special character)
// * Phone (must be in correct format)
// * User status (either active or inactive)