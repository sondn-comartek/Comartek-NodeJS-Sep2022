import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Book } from "./book.model";

@ObjectType()
export class ListBook {
    @Field( () => [Book] )
    books : Book[]

    @Field( () => Int)
    count : number
}