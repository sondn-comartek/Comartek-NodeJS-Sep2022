import { IsString, IsPhoneNumber, IsEmail, IsNotEmpty } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
}
