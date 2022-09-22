import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
