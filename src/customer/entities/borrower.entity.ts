import { Category } from './../../category/entities/category.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BorrowStatus } from '../borrow.enums';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

export type BorrowerDocument = Borrower & Document;
@Schema({ timestamps: true })
@ObjectType()
export class Borrower {
  @Field(() => String, { description: 'borrower id' })
  @Prop()
  borrowerID: string;
  @Field(() => String, { description: 'user id' })
  @Prop()
  userId: string;
  @Field(() => [String], { description: 'book id' })
  @Prop()
  bookIds: string[];
  @Field(() => BorrowStatus, { description: 'status borrow' })
  @Prop({ default: BorrowStatus.pending })
  status: BorrowStatus;
}
export const BorrowerSchema = SchemaFactory.createForClass(Borrower);
