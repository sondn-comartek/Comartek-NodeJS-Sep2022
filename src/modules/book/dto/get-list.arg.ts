import { ArgsType , Field, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

@ArgsType()
export class GetListArg { 
    @Field( () => Int , { nullable : true })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    page? : number
}