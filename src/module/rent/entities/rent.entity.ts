import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Book } from "src/module/books/entities/book.entity";
import { User } from "src/module/users/entities/user.entity";

export type RentBookDocument = RentBook & Document;

@Schema({
    timestamps: true,
    collection: 'rentBook'
})
@ObjectType()
export class RentBook {
    @Field(() => ID)
    _id: string;

    @Field(() => String, { name: 'user', description: 'ID of user in the system', nullable: false })
    @Prop({
        ref: User.name,
        required: true
    })
    user: string

    @Field(() => String, { name: 'book', description: 'ID of book in the system', nullable: false })
    @Prop({
        ref: Book.name,
        required: true
    })
    book: string

    @Field(() => String, { name: 'status', description: 'Status of a rentBook', nullable: false })
    @Prop({
        required: true
    })
    status: string;

    @Field(() => String, { name: 'startTime', description: 'Time to start renting a book', nullable: false })
    @Prop({
        required: true
    })
    startTime: string;

    @Field(() => String, { name: 'expiredTime', description: 'Expired time of renting a book', nullable: false })
    @Prop({
        required: false
    })
    expiredTime: string;
}

export const RentBookSchema = SchemaFactory.createForClass(RentBook);