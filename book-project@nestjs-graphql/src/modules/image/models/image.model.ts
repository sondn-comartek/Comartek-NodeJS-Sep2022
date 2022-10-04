import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ShapeImage } from "../types";


export type ImageDocument = Image & Document

@ObjectType()
@Schema({
    timestamps : true
})
export class Image {
    @Field()
    @Prop({ 
            isRequired : true
        })
    description : string 

    @Field( () => ID)
    @Prop({ 
         isRequired : true ,
         unique : true 
        })
    image_id : string

    @Field()
    @Prop({ 
        isRequired : true ,
        unique : true 
       })
    image_url : string

    @Field( () => ShapeImage )
    @Prop({ 
            isRequired : true
        })
    shape : ShapeImage
}


export const ImageSchema = SchemaFactory.createForClass(Image)