import { Document, Types } from 'mongoose'
import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose"
import { Field  , GraphQLTimestamp, ID , Int, ObjectType } from '@nestjs/graphql'
import { UserRole, UserStatus } from "../types" ;
import { Order } from 'src/modules/order/models';
import { Token } from 'src/modules/auth/models';



export type UserDocument = User & Document

@ObjectType()
@Schema()
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

    @Field( () => [Order])
    orders? : Order[]

    @Field( () => Int )
    count? : number

    @Field( () => Token  , { nullable : true })
    tokens? : Token

    @Field( () => GraphQLTimestamp , { nullable : true } )
    @Prop({
        default : new Date() ,
        type : Number
    })
    createdAt? : number | Date | string

    @Field( () => GraphQLTimestamp , { nullable : true} )
    @Prop({
        default : new Date(),
        type : Number
    })
    updatedAt? : number | Date | string

}

export const UserSchema = SchemaFactory.createForClass(User) 