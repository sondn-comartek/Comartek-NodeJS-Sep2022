import { SignInInput } from './inputs/sign-in.input';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from '../user/inputs/create-user.input';
import { UserService } from '../user/user.service';
import { PasswordHelper } from './helpers/password.helper';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { AuthResponseType } from './types/auth-response.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async signUp(createUserInput: CreateUserInput): Promise<AuthResponseType> {
    const { userName, email, password } = createUserInput;

    if (await this.userService.findByUserName(userName)) {
      throw new ConflictException('User name has been registered');
    }

    if (await this.userService.findByEmail(email)) {
      throw new ConflictException('Email has been registered');
    }

    const hashedPassword = await this.passwordHelper.encryptPassword(password);
    const user = await this.userService.create({
      ...createUserInput,
      password: hashedPassword,
    });

    const jwtPayload: JwtPayloadInterface = {
      _id: user._id,
      role: user.role,
    };

    const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '3600000',
    });
    const refreshToken: string = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '604800000',
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponseType> {
    const { userName, password } = signInInput;
    const user = await this.userService.findByUserName(userName);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (!(await this.passwordHelper.comparePassword(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    const jwtPayload: JwtPayloadInterface = {
      _id: user._id,
      role: user.role,
    };

    const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '3600000',
    });
    const refreshToken: string = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '604800000',
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
