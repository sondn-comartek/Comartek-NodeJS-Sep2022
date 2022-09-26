import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CategoryResponseType } from './category-response.type';
import { TagResponseType } from './tag-response.type';
import { PetStatus } from '../enums/pet-status.enum';
import { PhotoResponseType } from './photo-response.type';

@ObjectType()
export class PetResponseType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => CategoryResponseType, { nullable: true })
  category?: CategoryResponseType;

  @Field(() => [TagResponseType], { nullable: true })
  tags?: TagResponseType[];

  @Field(() => PhotoResponseType)
  photos: PhotoResponseType;

  @Field(() => String, { nullable: true })
  status?: PetStatus;
}
