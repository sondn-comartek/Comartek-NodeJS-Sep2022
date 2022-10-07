import { ArgsType, Field, PartialType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



@ArgsType()
export class FindPetArg {

    @Field({nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    petid? : string
    
    @Field({nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tags? : string 

    @Field({nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(['avaiable' , 'unavaiable'])
    status? : string

    @Field({ nullable : true}) 
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price? : number
}