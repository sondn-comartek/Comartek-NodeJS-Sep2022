import { InputType , Field , ID  } from '@nestjs/graphql';
import { 
    IsNotEmpty , 
    IsString, 
    IsUUID , 
    ArrayNotEmpty , 
    ArrayUnique ,
    IsArray } from 'class-validator'

@InputType()
export class CreateOrderInput {
    @Field( () => ID )
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    customer : string

    @Field( () => [ID] )
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID( 4 , { each : true})
    @ArrayUnique()
    books : string[]
}