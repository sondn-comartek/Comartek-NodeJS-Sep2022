import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
@InputType()
export class UserSignupInput {
    @Field()
    @IsNotEmpty()
    username: string
    @Field()
    @IsEmail()
    gmail: string
    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}
@InputType()
export class UserLoginInput {
    @Field()
    @IsEmail()
    gmail: string
    @Field()
    @IsNotEmpty()
    password: string
}
@InputType()
export class CreateOrderRequestInput {
    @Field()
    bookId: string
    @Field()
    dateBorrow: string
    @Field()
    dateReturn: string
}

@InputType()
export class UpdateOrderRequestInput {
    @Field()
    orderId: string
    @Field()
    status: string
}