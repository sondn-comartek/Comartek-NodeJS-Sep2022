import { Document, Types } from 'mongoose'
import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose"
import { Field  , ID , Int, ObjectType } from '@nestjs/graphql'
import { UserRole, UserStatus } from "../types" ;
import { Order } from 'src/modules/order/models';



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

    @Field( () => Date)
    createdAt? : Date

    @Field( () => Date )
    updatedAt? : Date

    @Field( () => [Order])
    orders? : Order[]

    @Field( () => Int )
    count? : number
}

export const UserSchema = SchemaFactory.createForClass(User) 