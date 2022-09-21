import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator"

@InputType()
export class SignInInput {
    @Field(type => String)
    @IsString()
    @IsNotEmpty()
    userName: string;

    @Field(type => String)
    @IsString()
    @IsNotEmpty()
    password: string;
}