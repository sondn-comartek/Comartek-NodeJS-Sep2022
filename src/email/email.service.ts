import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { UserStatus } from 'src/shared/enums';
import { CreateActiveAccountRequestInput } from 'src/shared/inputs';
import { OtpService } from '../otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../shared/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {
  constructor(
    private readonly otpService: OtpService,
    private readonly cachingService: CachingService,
    private readonly mailerService: MailerService,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) {}

  async sendOtpToEmail(
    createActiveAccountRequestInput: CreateActiveAccountRequestInput,
  ) {
    const { email } = createActiveAccountRequestInput;
    const user = await this.userSchema.findOne({ email });
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
