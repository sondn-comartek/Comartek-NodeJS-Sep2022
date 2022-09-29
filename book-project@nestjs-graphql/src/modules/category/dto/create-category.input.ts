import { InputType , Field } from '@nestjs/graphql'
import { IsString , IsNotEmpty , IsOptional } from "class-validator"

@InputType()
export class CreateCategoryInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name : string 
    
    @Field({nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image_url? : string
}