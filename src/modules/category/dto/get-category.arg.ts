import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";




@ArgsType()

export class GetCategoryArg{
    @Field()
    @IsNotEmpty()
    @IsString()
    code : string
}