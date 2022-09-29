
import { ObjectType , Field } from '@nestjs/graphql' ;
import { Schema , Prop , SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'


export type  CategoryDocument  = Category & Document 

@ObjectType()
@Schema()
export class Category extends Document {
    @Field() 
    @Prop({
        isRequired : true
    })
    name : string 

    @Field()
    @Prop({
        isRequired : true ,
        unique : true ,
    })
    code : string 

    @Field({nullable : true})
    @Prop({ default : null })
    image_url : string 
}


export const CategorySchema = SchemaFactory.createForClass(Category)