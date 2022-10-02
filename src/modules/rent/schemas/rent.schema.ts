import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Types } from 'mongoose';
import { Book } from 'src/modules/book/schemas/book.schema';
import { User } from 'src/modules/user/schemas/user.schema';
import { RentStatusEnum } from '../enums/rent-status.enum';

@ObjectType()
@Schema({
  collection: 'rents',
  timestamps: true,
})
export class Rent {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => User, { name: 'user' })
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  readonly userId: Types.ObjectId | User;

  @Field(() => [Book], { name: 'books' })
  @Prop({
    type: [Types.ObjectId],
    ref: Book.name,
    required: true,
  })
  readonly bookIds: Types.ObjectId[] | Book[];

  @Field(() => RentStatusEnum)
  @Prop({
    type: String,
    required: true,
    default: RentStatusEnum.PROCESSING,
  })
  readonly status: RentStatusEnum;

  @Field(() => String)
  readonly createdAt: Date;

  @Field(() => String)
  readonly updatedAt: Date;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
