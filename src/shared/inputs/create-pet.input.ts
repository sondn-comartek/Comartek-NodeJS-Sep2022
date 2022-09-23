import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly tagsId: [string];
}
