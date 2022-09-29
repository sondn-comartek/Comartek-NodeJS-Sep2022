import { InputType , Field } from '@nestjs/graphql';
import { 
    Matches  ,  
    IsEmail ,
    IsNotEmpty ,
    IsString ,
    MaxLength ,
    MinLength } from 'class-validator'

@InputType()
export class RegiserInput  {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    @IsEmail() 
    email : string 

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    username : string 

    @Field()
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password minimum eight characters, at least one letter, one number and one special character' ,
      }) 
    password : string 

}