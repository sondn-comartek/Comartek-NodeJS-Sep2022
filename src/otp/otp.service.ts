import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
    async createNewOtp() {
        let otp: string = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const otpLength = 4;

        for (let i = 0; i < otpLength; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return otp;
    }
}
