import { JwtPayload } from './../shared/interfaces/jwt-payload.interface';
import {
  BadRequestException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { AuthenticationErrorMessage } from './constants/index';
import { User } from 'src/shared/schemas';
import { SignInInput } from '../shared/inputs/sign-in-input';
import { JwtService } from '@nestjs/jwt';
import { Environments } from '../environments/index';
import { SignInResponse } from '../shared/types/sign-in-response.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseType } from '../shared/types/user-response.type';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userSchema: Model<User>,
  ) {}

  async signIn(signInInput: SignInInput) {
    const { userName, password } = signInInput;

    const user = await this.userSchema.findOne({
      userName: userName.toLowerCase(),
    });
    if (!user) {
      throw new BadRequestException(
        AuthenticationErrorMessage.NotRegisteredUserName,
      );
    }

    const isCorrectPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new BadRequestException(AuthenticationErrorMessage.WrongPassword);
    }

    const payload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: Environments.JwtSecret,
      expiresIn: '3600000', // 1 hour
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: Environments.JwtSecret,
      expiresIn: '604800000', // 1 week
    });
    const signInResponse: SignInResponse = {
      accessToken,
      refreshToken,
    };

    return signInResponse;
  }

  async signUp(createUserInput: CreateUserInput): Promise<UserResponseType> {
    const { email, userName, password } = createUserInput;

    const registeredUserName = await this.userSchema.findOne({ userName });
    if (registeredUserName) {
      throw new ConflictException(
        AuthenticationErrorMessage.RegisteredUserName,
      );
    }

    const registeredEmail = await this.userSchema.findOne({ email });
    if (registeredEmail) {
      throw new ConflictException(AuthenticationErrorMessage.RegisteredEmail);
    }

    const hashedPassword = await this.passwordService.encryptPassword(password);
    const newUserData = {
      ...createUserInput,
      userName: userName.toLowerCase(),
      password: hashedPassword,
    };
    const newUser = await this.userSchema.create(newUserData);

    const userResponse: UserResponseType = {
      _id: newUser._id.toString(),
      userName: newUser.userName,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      status: newUser.status,
      role: newUser.role,
    };

    return userResponse;
  }
}
