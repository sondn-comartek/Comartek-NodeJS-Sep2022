import { ObjectType, Field, Int, PartialType } from '@nestjs/graphql';
import { AdminCreateBookOutPut, UserOutPut } from './admin.output';

@ObjectType()
export class Admin extends PartialType(UserOutPut) {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
