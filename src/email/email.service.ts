import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { CreateActiveAccountRequestInput } from 'src/shared/inputs';
import { UserService } from 'src/user/user.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly otpService: OtpService,
    // private readonly cachingService: CachingService,
    private readonly userService: UserService,
  ) {}

  async sendOtpToEmail(
    createActiveAccountRequestInput: CreateActiveAccountRequestInput,
  ): Promise<string> {
    const { email } = createActiveAccountRequestInput;

    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const otp = await this.otpService.createNewOtp();
      // Insert otp into Redis server { "email": "otp" }
      // Send to email
      return `An OTP is sent to ${email}. Please check!`;
    }

    return `Email ${email} is not registered`;
  }
}
