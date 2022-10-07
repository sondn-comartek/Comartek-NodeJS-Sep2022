import { InputType , Field } from '@nestjs/graphql';
import { 
    IsNotEmpty , 
    IsEmail , IsString } from 'class-validator'

@InputType()
export class LoginInput{
    @Field()
    @IsNotEmpty()
    @IsString()
    password : string

    @Field()
    @IsNotEmpty()
    @IsEmail() 
    email : string 
}