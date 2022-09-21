import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [OtpModule],
  providers: [EmailService],
})
export class EmailModule { }
