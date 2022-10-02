import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly mediaId: string;
}
