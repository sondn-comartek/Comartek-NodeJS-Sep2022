import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PetDocument = Pet & Document

@ObjectType({ description : 'pet'})
@Schema()
export class Pet extends Document {
    @Field( () => ID )
    @Prop({ isRequired : true , unique : true }) 
    petid : string     
    
    @Field({nullable : true})
    @Prop({default : null}) 
    category : string 

    @Field() 
    @Prop({ isRequired: true })
    name : string 

    @Field({ nullable : true})
    @Prop({default : null})
    tags : string 

    @Field()
    @Prop({ isRequired : true , default : 'avaiable'})
    status : string 

    @Field({ nullable : true })
    @Prop({default : null})
    photo_url : string

    @Field( () => Int)
    @Prop({isRequired : true , default : 0}) 
    price : number

}

export const PetSchema = SchemaFactory.createForClass(Pet)

    // * Pet ID
    // * Category
    // * Name
    // * Tags
    // * Status
    // * Photo URLs