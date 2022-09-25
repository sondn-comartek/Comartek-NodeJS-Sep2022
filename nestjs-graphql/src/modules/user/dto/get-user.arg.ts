import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


@ArgsType()
export class GetUserArg {
    @Field( (type) => ID , { nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    userid? : string

    @Field({nullable : true }) 
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username? : string

    @Field({nullable : true }) 
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email? : string

}