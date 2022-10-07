import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FileMessageOutput {
  @Field(() => String)
  fileId: string
  @Field(() => String)
  message: string
}
