import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class ListCategory {
  @Field(() => Category)
  category: Category;

  @Field()
  total: number;

  @Field()
  borrowed: number;

  @Field()
  available: number;
}
