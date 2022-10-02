import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MimetypeEnum } from 'src/common/enums/mimetype.enum';

@ObjectType()
@Schema({
  collection: 'medias',
  timestamps: true,
})
export class Media {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly filename: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly mimetype: MimetypeEnum;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
