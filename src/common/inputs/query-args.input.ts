import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Min, Max } from 'class-validator';

@InputType()
export class QueryArgsInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  @Max(10)
  readonly limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  @Max(10)
  readonly skip?: number;
}
