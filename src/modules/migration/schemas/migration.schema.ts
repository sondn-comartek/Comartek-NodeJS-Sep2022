import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  collection: 'migrations',
})
export class Migration extends Document {
  @Prop({
    type: String,
    required: true,
  })
  readonly key: string;

  @Prop({
    type: Date,
    required: true,
  })
  readonly createdAt: Date;
}
