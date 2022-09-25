import { InputType , Field } from '@nestjs/graphql';
import { 
    IsNotEmpty , 
    IsEmail } from 'class-validator'

@InputType()
export class LoginInput{
    @Field()
    @IsNotEmpty()
    password : string

    @Field()
    @IsNotEmpty()
    @IsEmail() 
    email : string 
}