import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  categoryId: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  part: number;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  imageId: string;

  @Field(() => Int)
  widthImage: number;
}
