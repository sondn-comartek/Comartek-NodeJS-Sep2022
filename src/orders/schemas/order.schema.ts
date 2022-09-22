import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Pet } from 'src/pets/schemas/pet.schema';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enums/status.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop(() => [String])
  petsId: [string];

  @Prop()
  price: number;

  @Prop({ type: Date })
  shipDate: Date;

  @Prop({ type: String, default: OrderStatus.Placed })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
