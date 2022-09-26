import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class QueryMongoIdInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
