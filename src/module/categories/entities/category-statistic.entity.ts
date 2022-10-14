import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class CategoryStatistic {
  @Field(() => Number, { name: 'totalBook', description: 'Total number of book of category', nullable: false })
  totalBook: number;

  @Field(() => Number, { name: 'available', description: 'Total number of available book of category', nullable: false })
  available: number;

  @Field(() => Number, { name: 'hasRent', description: 'Total number of book that has been rent of category', nullable: false })
  hasRent: number;
}