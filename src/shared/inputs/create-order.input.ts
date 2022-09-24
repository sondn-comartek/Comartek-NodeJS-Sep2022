import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsMongoId({ each: true })
  readonly petsId: string[];
}
