import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRegisterRequestDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {
        message: "Name must be at least 6 characters"
    })
    @MaxLength(50, {
        message: "Name can be up to 50 characters in length"
    })
    name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {
        message: "Password must be at least 6 characters"
    })
    password: string;
}