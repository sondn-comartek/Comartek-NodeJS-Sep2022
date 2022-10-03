import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Category } from "src/modules/category/model/category.model";
import { FileUploadModel } from "src/modules/fileupload/model/fileupload.model";

@Schema()
@ObjectType()
export class Book {
    @Field()
    id: string

    @Prop()
    @Field()
    name: string

    @Field(() => Category)
    @Prop({
        type: Types.ObjectId,
        ref: Category.name
    })
    Category: Category | Types.ObjectId

    @Prop({
        type: Types.ObjectId,
        ref: FileUploadModel.name
    })
    @Field(() => String)
    imgId: Types.ObjectId | string

    @Field()
    @Prop()
    quanities: number

    @Field()
    @Prop({ default: 0 })
    borrowed: number

    @Field()
    remain: number

    @Field()
    @Prop()
    pages: number
}
export const bookSchema = SchemaFactory.createForClass(Book)