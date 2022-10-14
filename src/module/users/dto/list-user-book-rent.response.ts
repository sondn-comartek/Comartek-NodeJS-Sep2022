import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Book } from "src/module/books/entities/book.entity";

@ObjectType()
export class UserBookRentList {
    @Field(() => [Book])
    readonly books: Book[];

    @Field(() => Int)
    readonly totalRent: number;
}