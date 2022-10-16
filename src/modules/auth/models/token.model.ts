import { ObjectType  , Field, ID  } from '@nestjs/graphql'
import { Prop, Schema , SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'


export type TokenDocument = Token & Document

@ObjectType()
@Schema({
    timestamps : true
})
export class Token {

    @Prop({
        isRequired : true ,
        unique : true
    })
    userid: string 

    @Field()
    @Prop()
    accessToken : string 

    @Field()
    @Prop()
    refreshToken : string 
}

export const TokenSchema = SchemaFactory.createForClass(Token)