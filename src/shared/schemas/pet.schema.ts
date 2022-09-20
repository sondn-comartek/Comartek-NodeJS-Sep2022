import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    collection: "pets",
    _id: false,
    timestamps: true
})
export class Pet { }

export const PetSchema = SchemaFactory.createForClass(Pet)