import { Field, Float, ObjectType } from "@nestjs/graphql";
import { CategoryResponseType } from './category-response.type';
import { TagResponseType } from './tag-response.type';
import { PetStatus } from '../enums/pet-status.enum';
import { PhotoResponseType } from './photo-response.type';

@ObjectType()
export class PetResponseType {
    @Field(() => String)
    _id: string

    @Field(() => String)
    name: string

    @Field(() => CategoryResponseType)
    category: CategoryResponseType

    @Field(() => [TagResponseType])
    tags: TagResponseType[]

    @Field(() => [PhotoResponseType])
    photos: PhotoResponseType[]

    @Field(() => String)
    status: PetStatus

    @Field(() => Float)
    price: number
}