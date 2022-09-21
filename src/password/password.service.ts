import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { Environments } from '../environments';

@Injectable()
export class PasswordService {
    async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Environments.Salt);
    }

    async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
