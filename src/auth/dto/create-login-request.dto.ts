import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateLoginRequestDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
