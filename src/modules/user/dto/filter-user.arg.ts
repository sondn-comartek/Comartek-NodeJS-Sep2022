
import { ArgsType , Field , ID } from "@nestjs/graphql"
import { IsOptional , IsString , IsEmail , IsUUID , IsNotEmpty } from 'class-validator'; 

@ArgsType()
export class FilterUser  {
    @Field( () => ID , { nullable : true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userid? : string 

    @Field({ nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email? : string 

    @Field({ nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username? : string
}
