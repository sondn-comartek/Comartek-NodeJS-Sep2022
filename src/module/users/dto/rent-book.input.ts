import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";

@InputType()
export class RentBookInput {
    @IsString()
    @Field(() => String, { name: 'bookId', description: "Id of book that user rent", nullable: false })
    bookId: string;

    @IsInt()
    @Field(() => Int, { name: 'rentTime', description: 'Total time to rent a book (in units of days)', nullable: false })
    rentTime: number;
}