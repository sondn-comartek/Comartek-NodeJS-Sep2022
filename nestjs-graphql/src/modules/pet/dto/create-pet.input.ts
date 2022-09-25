import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class CreatePetInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    name: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    category?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    tags?: string

    @Field() 
    @IsNumber()
    @IsNotEmpty()
    price : number
}

// * Pet ID
    // * Category
    // * Name
    // * Tags
    // * Status
    // * Photo URLs