import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, ObjectId } from "mongoose";
import { Book } from "src/modules/book/model/book.model";
import { User } from "src/modules/user/model/user.model";

@Schema()
@ObjectType()
export class Order {
    @Field()
    id: string
    @Field(() => Book)
    @Prop({
        type: Types.ObjectId,
        ref: Book.name
    })
    Book: Types.ObjectId | Book
    @Field(() => User)
    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    User: Types.ObjectId | User

    @Field()
    @Prop()
    dateBorrow: string

    @Field()
    @Prop()
    dateReturn: string

    @Field()
    @Prop({ default: 'processing' })
    status: string
}

export const orderSchema = SchemaFactory.createForClass(Order)