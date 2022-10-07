import { ObjectType, Field, Int, GraphQLTimestamp } from '@nestjs/graphql'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Book } from 'src/modules/book/models'

export type CategoryDocument = Category & Document

@ObjectType()
@Schema({
    timestamps : true
})
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

export const CategorySchema = SchemaFactory.createForClass(Category)
