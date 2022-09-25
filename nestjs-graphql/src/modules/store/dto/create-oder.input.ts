import { Field, InputType , ID, GraphQLTimestamp } from "@nestjs/graphql";
import { 
    IsArray ,
    ArrayNotEmpty , 
    ArrayUnique, 
    IsDate , 
    IsNotEmpty, 
    IsOptional } from "class-validator";

@InputType()
export class CreateOrderInput {
    @Field( () => [ID])
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    pets : string[]

    @Field(() => GraphQLTimestamp , { nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    expected_date? : Date 
}