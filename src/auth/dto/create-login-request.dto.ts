import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateLoginRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
