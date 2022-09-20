import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    min: 6,
    max: 50,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    required: true,
    default: Role.Customer,
  })
  role: string;
}

export const UserEntity = SchemaFactory.createForClass(User);
