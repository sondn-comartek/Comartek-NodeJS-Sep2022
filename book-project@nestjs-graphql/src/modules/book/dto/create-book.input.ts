
import { InputType , Field  } from '@nestjs/graphql';
import { 
    IsNotEmpty , 
    IsNumber , 
    IsOptional , 
    IsString , 
    ArrayNotEmpty , 
    ArrayUnique ,
    IsArray ,
    Min } from 'class-validator'


@InputType() 
export class CreateBookInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    name : string

    @Field( () => [String] )
    @IsArray()
    @ArrayNotEmpty()
    @IsString( { each : true })
    @ArrayUnique()
    categories : string[]

    @Field({nullable : true , defaultValue : 1})
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    part? : number 

    @Field()
    @IsNotEmpty()
    @IsNumber()
    amount : number 

    @Field({ nullable : true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image_url? : string 
}


