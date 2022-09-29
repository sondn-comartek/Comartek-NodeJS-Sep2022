
import { ObjectType , Field  , Int, ID } from '@nestjs/graphql'
import { Prop , Schema , SchemaFactory } from '@nestjs/mongoose' 
import { Document } from 'mongoose' 
import { Category } from 'src/modules/category/models'
import { BookStatus } from '../types'


export type BookDocument = Book & Document 

@ObjectType()
@Schema({
    timestamps : true ,
    autoIndex  : true
})
export class Book {
    @Field( () => ID )
    @Prop({
        isRequired : true ,
        unique : true
    })
    bookid : string 

    @Field()
    @Prop({ 
        isRequired : true 
    })
    name : string  

    @Field()
    @Prop( {
        isRequired : true ,
        unique : true 
    })
    code : string 

    @Field( () => [String])
    @Prop({
        isRequired : true ,
        ref : 'category',
    })
    categories : string[]

    @Field( () => Int  )
    @Prop({ default : 1 })
    part : number 

    @Field(() => Int )
    @Prop({ isRequired : true })
    amount :  number 

    @Field({ nullable : true})
    @Prop({ default : null })
    image_url : string 

    @Field( () => BookStatus)
    @Prop({ default : BookStatus.AVAIABLE })
    status : BookStatus

    @Field( () => Date)
    createdAt : Date

    @Field( () => Date )
    updatedAt : Date

}

export const BookSchema = SchemaFactory.createForClass(Book)

// tên sách, mã sách, danh mục, tập, số trang, hình ảnh,