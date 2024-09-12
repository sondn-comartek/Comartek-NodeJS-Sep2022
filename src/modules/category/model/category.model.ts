import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { FileUploadModel } from "src/modules/fileupload/model/fileupload.model";

@Schema()
@ObjectType()
export class Category {
    @Field()
    id: string
    @Field()
    @Prop()
    name: string
    @Field(() => String)
    @Prop({
        type: Types.ObjectId,
        ref: FileUploadModel.name
    })
    imgId: Types.ObjectId | string
    @Field()
    @Prop({
        default: Date.now
    })
    createdAt: number
    @Field()
    @Prop({
        default: Date.now
    })
    updatedAt: number
}
export const categorySchema = SchemaFactory.createForClass(Category)