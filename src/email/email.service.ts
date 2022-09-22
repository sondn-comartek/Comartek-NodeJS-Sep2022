import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { CreateActiveAccountRequestInput } from 'src/shared/inputs';
import { UserService } from 'src/user/user.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly otpService: OtpService,
    private readonly cachingService: CachingService,
    private readonly userService: UserService,
  ) {}

  async sendOtpToEmail(
    createActiveAccountRequestInput: CreateActiveAccountRequestInput,
  ) {
    const { email } = createActiveAccountRequestInput;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return 'Email không tồn tại';
    }

    const cachedValue = await this.cachingService.getValueByKey(email);
    if (cachedValue) {
      return 'Mã OTP đã được gửi đi trước đó. Vui lòng kiểm tra email';
    }

    const otp = await this.otpService.createNewOtp();

    await this.cachingService.setValue(email, otp);

    return 'Mã OTP đã được gử tới email';
  }
}
