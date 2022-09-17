import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateLoginRequestDto } from './dto/create-login-request.dto';
import { CreateRegisterRequestDto } from './dto/create-register-request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthErrorMessage } from './constants';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService) { }

  async login(createLoginRequestDto: CreateLoginRequestDto): Promise<Object> {
    return
    // const { email, password } = createLoginRequestDto;
    // const filter = { email: email.toLowerCase() };
    // const user = await this.userEntity.findOne(filter);

    // if (!user) {
    //   throw new HttpException(AuthErrorMessage.NotRegisteredEmail, HttpStatus.BAD_REQUEST);
    // }

    // const isCorrectPassword = await this.passwordService.comparePassword(password, user.password);
    // if (!isCorrectPassword) {
    //   throw new HttpException(AuthErrorMessage.WrongPassword, HttpStatus.BAD_REQUEST);
    // }

    // return { data: { user } };
  }

  async register(createRegisterRequestDto: CreateRegisterRequestDto): Promise<Object> {
    return
    // const { email, password } = createRegisterRequestDto;
    // const filter = { email: email.toLowerCase() };
    // const registeredEmail: User = await this.userEntity.findOne(filter);

    // if (registeredEmail) {
    //   throw new HttpException(AuthErrorMessage.RegisteredEmail, HttpStatus.BAD_REQUEST);
    // }

    // const hashedPassword = await this.passwordService.encryptPassword(password);
    // const newUser = await this.userEntity.create({
    //   ...createRegisterRequestDto,
    //   email: email.toLowerCase(),
    //   password: hashedPassword
    // });

    // return { data: { user: newUser } }
  }
}
