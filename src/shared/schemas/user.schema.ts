import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, UserStatus } from '../enums';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  userName: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
    default: UserStatus.Active, // vì chỗ này chưa thể config gửi mailer nhận OTP để viết mutation active tài khoản nên để default là Active
  })
  status: UserStatus;

  @Prop({
    type: String,
    required: true,
    default: UserRole.User,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
