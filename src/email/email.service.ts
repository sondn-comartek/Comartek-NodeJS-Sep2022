import { Injectable } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class EmailService {
    constructor(private readonly otpService: OtpService) {

    }

    async sendOtpToEmail(email) { }
}
