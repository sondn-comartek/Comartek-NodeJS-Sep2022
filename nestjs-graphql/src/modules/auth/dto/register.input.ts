import { InputType , Field } from '@nestjs/graphql';
import { 
    IsString , 
    IsNotEmpty , 
    IsEmail , 
    MinLength , 
    MaxLength , 
    IsOptional ,
    Matches } from 'class-validator'

@InputType()
export class RegiserInput{
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
          'Minimum eight characters, at least one letter, one number and one special character' ,
      })
    password : string

    @Field()
    @IsNotEmpty()
    @IsEmail() 
    email : string 

    @Field({ nullable : true})
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstname? : string 

    @Field({ nullable : true})
    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    lastname? : string 

    @Field({ nullable : true})
    @IsOptional()
    @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g ,{
        message : 'Phone number is invalid!'
    })
    phone? : string 
}