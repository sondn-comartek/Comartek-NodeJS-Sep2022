
import { ObjectType , Field  , Int, ID, GraphQLTimestamp } from '@nestjs/graphql'
import { Prop , Schema , SchemaFactory } from '@nestjs/mongoose' 
import { Document, Types } from 'mongoose' 
import { Category } from 'src/modules/category/models'


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
        unique : true ,
    })
    bookid : string 

    @Field()
    @Prop({ 
        isRequired : true 
    })
    title : string  

    @Field()
    @Prop( {
        isRequired : true ,
        unique : true 
    })
    code : string 

    @Field( () => [Category])
    @Prop({
        isRequired : true ,
    })
    categories : string[]

    @Field( () => Int  )
    @Prop({ default : 1 })
    part : number 

    @Field(() => Int )
    @Prop({ isRequired : true })
    page_count :  number 

    @Field(() => Int )
    @Prop({ isRequired : true })
    count_avaiable :  number 

    @Field(() => Int )
    @Prop({ isRequired : true , default : 0 })
    count_unavaiable :  number 

    @Field({ nullable : true})
    @Prop({ default : null })
    image_url : string 

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

    @Field( () => Int )
    total? : number 

}

export const BookSchema = SchemaFactory.createForClass(Book)

// tên sách, mã sách, danh mục, tập, số trang, hình ảnh,