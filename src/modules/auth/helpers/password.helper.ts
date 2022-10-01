import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  async encryptPassword(password: string): Promise<string> {
    const salt: string = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
