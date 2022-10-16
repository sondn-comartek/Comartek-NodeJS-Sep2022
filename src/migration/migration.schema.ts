import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type MigrationDocument = Migration & Document

@Schema()
export class Migration extends Document {
   @Prop({
      unique: true,
   })
   key: String

   @Prop({
      default: new Date,
   })
   createdAt?: number

   @Prop({
      default: new Date,
   })
   updatedAt?: number
}

export const MigrationSchema = SchemaFactory.createForClass(Migration)
