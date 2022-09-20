import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
import { CreateContactDto } from './create-contact.dto';

export class CreateOriginDto {
  @IsNotEmpty()
  @IsObject()
  @Type(() => CreateContactDto)
  @ValidateNested()
  readonly contact: CreateContactDto;

  @IsNotEmpty()
  @IsObject()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  readonly address: CreateAddressDto;
}
