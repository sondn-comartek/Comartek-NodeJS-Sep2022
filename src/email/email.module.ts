import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { OtpModule } from '../otp/otp.module';
import { EmailResolver } from './email.resolver';
import { CachingModule } from '../caching/caching.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, User } from '../shared/schemas';

@Module({
  imports: [
    OtpModule,
    CachingModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: CategorySchema }]),
  ],
  providers: [EmailService, EmailResolver],
})
export class EmailModule {}
