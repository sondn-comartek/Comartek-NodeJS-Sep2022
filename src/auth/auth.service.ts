import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginRequestDto } from './dto/create-login-request.dto';
import { CreateRegisterRequestDto } from './dto/create-register-request.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { AuthErrorMessage } from './constants';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userEntity: Model<User>,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService) { }

  async login(createLoginRequestDto: CreateLoginRequestDto): Promise<Object> {
    const { email, password } = createLoginRequestDto;
    const filter = { email: email.toLowerCase() };
    const user = await this.userEntity.findOne(filter);

    if (!user) {
      throw new HttpException(AuthErrorMessage.NotRegisteredEmail, HttpStatus.BAD_REQUEST);
    }

    const isCorrectPassword = await this.passwordService.comparePassword(password, user.password);
    if (!isCorrectPassword) {
      throw new HttpException(AuthErrorMessage.WrongPassword, HttpStatus.BAD_REQUEST);
    }

    return { data: { user } };
  }

  async register(createRegisterRequestDto: CreateRegisterRequestDto): Promise<Object> {
    const { email, password } = createRegisterRequestDto;
    const filter = { email: email.toLowerCase() };
    const registeredEmail: User = await this.userEntity.findOne(filter);

    if (registeredEmail) {
      throw new HttpException(AuthErrorMessage.RegisteredEmail, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.passwordService.encryptPassword(password);
    const newUser = await this.userEntity.create({
      ...createRegisterRequestDto,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    return { data: { user: newUser } }
  }
}
