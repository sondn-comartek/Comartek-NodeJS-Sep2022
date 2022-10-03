import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoanStatus } from '../enums/status.enum';
import { ObjectType, Field } from '@nestjs/graphql';

export type LoanDocument = Loan & Document;

@ObjectType()
@Schema({
  timestamps: true,
})
export class Loan {
  @Field(() => String)
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  userId: string;

  @Field(() => String)
  @Prop({ required: true })
  bookItemId: string;

  @Field(() => Date)
  @Prop({ required: true, default: new Date() })
  dateBorrow: Date;

  @Field(() => String)
  @Prop({ required: true, type: String, default: LoanStatus.Borrowing })
  status: LoanStatus;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
