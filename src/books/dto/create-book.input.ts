import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  categoryId: string;

  @Field()
  name: string;

  @Field(() => Int)
  part: number;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Int)
  quantity: number;

  // @Field(() => GraphQLUpload)
  // image: Promise<FileUpload>;
}
