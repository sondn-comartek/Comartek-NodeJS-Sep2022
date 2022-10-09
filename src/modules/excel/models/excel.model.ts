import { ObjectType  , Field, GraphQLTimestamp, ID } from "@nestjs/graphql";
import { Prop, Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export type ExcelDocument = Excel & Document

@ObjectType()    
@Schema()
export class Excel {
    @Field( () => ID)
    @Prop({
        unique : true
    })
    excelId : string 

    @Field()
    @Prop({
        unique : true
    })
    excel_url : string


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


export const ExcelSchema = SchemaFactory.createForClass(Excel)