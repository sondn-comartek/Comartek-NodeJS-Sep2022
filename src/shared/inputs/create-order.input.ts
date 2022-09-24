import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly petsId: string[];
}
