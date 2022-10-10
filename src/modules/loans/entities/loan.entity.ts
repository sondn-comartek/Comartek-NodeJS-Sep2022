import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoanStatus } from '../enums/status.enum';
import { ObjectType, Field } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

export type LoanDocument = Loan & Document;

@ObjectType()
@Schema()
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
  @Prop({ required: true, default: dayjs(new Date()).unix() })
  dateBorrow: string;

  @Field(() => String)
  @Prop({ required: true, type: String, default: LoanStatus.Borrowing })
  status: LoanStatus;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  createdAt: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  updatedAt: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
