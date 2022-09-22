import { ObjectType, Field } from '@nestjs/graphql';
import { PetStatus } from '../enums/status.enum';

@ObjectType()
export class Pet {
  @Field()
  id: string;

  @Field()
  category: string;

  @Field()
  name: string;

  @Field()
  tags: string;

  @Field()
  status: PetStatus;

  @Field()
  photoUrl: string;

  @Field()
  price: number;
}
