
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MigraionDocument = Migration & Document;

@Schema({timestamps: true})
export class Migration extends Document {
  @Prop()
  collectionname: string

  @Prop()
  status: string

}

export const MigrationSchema = SchemaFactory.createForClass(Migration);