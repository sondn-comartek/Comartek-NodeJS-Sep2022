import { ArgsType , Field, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { BookStatus } from "../types";



@ArgsType()
export class GetListArg {
    @Field( () => BookStatus , { nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn([BookStatus.AVAIABLE , BookStatus.PENDING , BookStatus.UNAVAIABLE])
    status? : BookStatus 

    @Field( () => Int , { nullable : true })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    page : number
}