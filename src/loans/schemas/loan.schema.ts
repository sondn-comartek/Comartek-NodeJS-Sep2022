import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoanStatus } from '../enums/status.enum';

export type LoanDocument = Loan & Document;

@Schema({
  timestamps: true,
})
export class Loan {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookItemId: string;

  @Prop({ required: true, default: new Date() })
  dateBorrow: Date;

  @Prop({ required: true, type: String, default: LoanStatus.Borrowing })
  status: LoanStatus;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
