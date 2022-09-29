import { Document } from 'mongoose'
import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose"
import { Field  , ID , ObjectType } from '@nestjs/graphql'
import { UserRole, UserStatus } from "../types" ;



export type UserDocument = User & Document

@ObjectType({description : "user"})
@Schema({
    timestamps : true 
})
export class User extends Document {

    @Field( () => ID )
    @Prop( {
        isRequired : true ,
        unique : true , 
    })
    userid : string 

    @Field()
    @Prop( {
        isRequired : true ,
        unique : true 
    })
    username : string 

    @Field()
    @Prop({
        isRequired : true , 
        unique : true 
    })
    email : string 

    @Prop({
        isRequired : true
    })
    hash : string 

    @Field( () => UserStatus)
    @Prop( { default : UserStatus.ACTIVE })
    status : UserStatus

    @Field( () => UserRole )
    @Prop({
        default : UserRole.MEMBER
    })
    role : UserRole

    @Field( () => [ID])
    @Prop({
        unique : true ,
        default : null
    })
    books : string[]

    @Field( () => Date)
    createdAt : Date

    @Field( () => Date )
    updatedAt : Date
}

export const UserSchema = SchemaFactory.createForClass(User) 