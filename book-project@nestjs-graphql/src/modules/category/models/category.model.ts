import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Book } from 'src/modules/book/models'

export type CategoryDocument = Category & Document

@ObjectType()
@Schema()
export class Category extends Document {
   @Field()
   @Prop({
      isRequired: true,
   })
   name: string

   @Field()
   @Prop({
      isRequired: true,
      unique: true,
   })
   code: string

   @Field({ nullable: true })
   @Prop({ default: null })
   image_url: string

   @Field(() => [Book])
   books?: Book[]

   @Field(() => Int)
   total?: number

   @Field(() => Int)
   count_unavaiableBook?: number

   @Field(() => Int)
   count_avaiableBook?: number
}

export const CategorySchema = SchemaFactory.createForClass(Category)
