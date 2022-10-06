import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMediaInput {
  // @Field(() => String)
  // @IsNotEmpty()
  // @IsString()
  // readonly filename: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly mimetype: string;
}
