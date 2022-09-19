import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ShipmentStatus } from "../enums/shipment-status.enum";

@Schema({
  collection: "shipments",
})
export class Shipment {
  @Prop({
    type: String,
    requried: true,
    unique: true,
  })
  ref: string;

  @Prop({
    type: String,
    enum: ShipmentStatus,
    required: true,
    default: ShipmentStatus.Pending
  })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    reuqired: true,
  })
  origin: any;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    reuqired: true,
  })
  destination: any;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    reuqired: true,
  })
  package: any;

  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: new Date(),
  })
  updatedAt: Date;
}

export const ShipmentEntity = SchemaFactory.createForClass(Shipment);
