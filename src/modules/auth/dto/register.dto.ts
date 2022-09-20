import { 
    IsEmail, 
    IsString , 
    IsNotEmpty ,
    Matches
  } from "class-validator";


export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Minimum eight characters, at least one letter and one number' ,
    })
    password : string
}
