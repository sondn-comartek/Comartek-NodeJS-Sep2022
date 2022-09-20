import {
    IsEmail ,
    IsString ,
    IsNotEmpty ,
} from 'class-validator'



export class CreateUserDto {
    @IsEmail()
    @IsString()
    email : string

    @IsString()
    @IsNotEmpty()
    hash : string
}
