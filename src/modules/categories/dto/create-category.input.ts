import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  imageId: string;

  @Field(() => Int)
  widthImage: number;
}
