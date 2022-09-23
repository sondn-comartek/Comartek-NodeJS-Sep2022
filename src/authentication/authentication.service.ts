import { JwtPayload } from './../shared/interfaces/jwt-payload.interface';
import {
  BadRequestException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from '../password/password.service';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { AuthenticationError } from 'apollo-server-express';
import { AuthenticationErrorMessage } from './constants/index';
import { User } from 'src/shared/schemas';
import { SignInInput } from '../shared/inputs/sign-in-input';
import { JwtService } from '@nestjs/jwt';
import { Environments } from '../environments/index';
import { SignInResponse } from '../shared/types/sign-in-response.type';
import { } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(signInInput: SignInInput) {
    const { userName, password } = signInInput;

    const user = await this.userService.getUserByUserName(userName);
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
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: Environments.JwtSecret,
      expiresIn: '3600',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: Environments.JwtSecret,
      expiresIn: '604800',
    });
    const signInResponse: SignInResponse = {
      accessToken,
      refreshToken,
    };

    return signInResponse;
  }

  async signUp(createUserInput: CreateUserInput): Promise<User> {
    const { email, userName, password } = createUserInput;

    const registeredUserName = await this.userService.getUserByUserName(
      userName,
    );
    if (registeredUserName) {
      throw new ConflictException(
        AuthenticationErrorMessage.RegisteredUserName,
      );
    }

    const registeredEmail = await this.userService.getUserByEmail(email);
    if (registeredEmail) {
      throw new ConflictException(AuthenticationErrorMessage.RegisteredEmail);
    }

    const hashedPassword = await this.passwordService.encryptPassword(password);
    const newUserData = {
      ...createUserInput,
      userName: userName.toLowerCase(),
      password: hashedPassword,
    };
    const newUser = await this.userService.createNewUser(newUserData);

    return newUser;
  }
}
