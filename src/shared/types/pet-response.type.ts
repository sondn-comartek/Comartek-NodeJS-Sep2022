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

  @Field(() => CategoryResponseType)
  category: CategoryResponseType;

  @Field(() => [TagResponseType])
  tags: TagResponseType[];

  @Field(() => [PhotoResponseType])
  photos: PhotoResponseType[];

  @Field(() => String)
  status: PetStatus;

  constructor(
    _id: string,
    name: string,
    price: number,
    category: CategoryResponseType,
    tags: TagResponseType[],
    photos: PhotoResponseType[],
    status: PetStatus,
  ) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.tags = tags;
    this.photos = photos;
    this.status = status;
  }
}
