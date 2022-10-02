import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { RentStatusEnum } from '../enums/rent-status.enum';

@InputType()
export class UpdateRentStatusInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly rentId: string;

  @Field(() => RentStatusEnum)
  @IsNotEmpty()
  @IsString()
  readonly updateStatus: RentStatusEnum;
}
