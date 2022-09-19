import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  collection: "rates",
})
export class Rate {
  @Prop({
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: String,
    required: true,
    default: "g",
  })
  weightUnit: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    required: true,
    default: "USD",
  })
  montaryUnit: string;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  discount: number;
}

export const RateEntity = SchemaFactory.createForClass(Rate);
