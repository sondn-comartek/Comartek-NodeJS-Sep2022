import { ArgsType, Field, Int } from "@nestjs/graphql";
import {  IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";



@ArgsType()
export class GetListArg {
    @Field(() => String )
    @IsNotEmpty()
    @IsString()
    categoryCode: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    page: number
}