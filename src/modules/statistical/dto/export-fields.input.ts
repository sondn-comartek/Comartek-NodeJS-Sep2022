import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExportFields {
  @Field(() => [String], { description: 'category' })
  category: string[];
}
