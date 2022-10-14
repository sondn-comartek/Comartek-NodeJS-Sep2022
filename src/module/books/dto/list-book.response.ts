import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Book } from "../entities/book.entity";

@ObjectType()
export class BookList {
    @Field(() => [Book])
    readonly book: Book[];

    @Field(() => Int)
    readonly countAllBook: number;

    @Field(() => Int)
    readonly countBookRent: number;

    @Field(() => Int)
    readonly countRestBook: number;
}