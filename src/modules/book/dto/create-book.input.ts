
import { InputType , Field, ID  } from '@nestjs/graphql';
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
    title : string

    @Field( () => [ID] )
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

    @Field({defaultValue : 1})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    page_count : number 

    @Field({defaultValue : 1})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    count_avaiable : number 

    @Field({ nullable : true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image_url? : string 
}


