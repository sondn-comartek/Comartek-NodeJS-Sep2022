import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stream } from 'stream';


@Schema()
@ObjectType()
export class FileUploadModel {
    @Field()
    id: string

    @Field()
    @Prop()
    src: string

    @Field()
    @Prop()
    type: string

}

export const fileUploadSchema = SchemaFactory.createForClass(FileUploadModel)

