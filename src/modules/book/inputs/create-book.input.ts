import { Field, InputType, Int } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly categoryId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly mediaId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly description?: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  readonly pageTotal: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  readonly available: number;
}
