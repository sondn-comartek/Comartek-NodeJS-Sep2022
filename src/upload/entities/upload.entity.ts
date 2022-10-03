import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UploadImageDocument = UploadImage & Document;

@ObjectType()
@Schema({
  timestamps: true,
})
export class UploadImage {
  @Field()
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Field()
  @Prop({ required: true })
  filename: string;
}

export const UploadImageSchema = SchemaFactory.createForClass(UploadImage);
