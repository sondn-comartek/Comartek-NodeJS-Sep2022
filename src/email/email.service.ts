import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { UserStatus } from 'src/shared/enums';
import { CreateActiveAccountRequestInput } from 'src/shared/inputs';
import { UserService } from 'src/user/user.service';
import { OtpService } from '../otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly otpService: OtpService,
    private readonly cachingService: CachingService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async sendOtpToEmail(
    createActiveAccountRequestInput: CreateActiveAccountRequestInput,
  ) {
    const { email } = createActiveAccountRequestInput;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return 'Email không tồn tại';
    }

    if (user.status === UserStatus.Active) {
      return 'Tài khoản đã được kích hoạt';
    }

    const cachedValue = await this.cachingService.getValueByKey(email);
    if (cachedValue) {
      return 'Mã OTP đã được gửi đi trước đó. Vui lòng kiểm tra email';
    }

    const otp = await this.otpService.createNewOtp();

    await this.cachingService.setValue(email, otp);

    await this.mailerService.sendMail({
      // transporterName: "smtps://tuantuan922001@gmail.com:xcpalookumqbjcss@smtp.gmail.com",
      to: email,
      subject: 'OTP to active account',
      html: `<p>Your OTP: ${otp}<p>`,
    });

    return 'Mã OTP đã được gửi tới email';
  }
}
