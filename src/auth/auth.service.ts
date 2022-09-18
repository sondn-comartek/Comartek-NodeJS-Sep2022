import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { CreateLoginRequestDto } from "./dto/create-login-request.dto";
import { CreateRegisterRequestDto } from "./dto/create-register-request.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthErrorMessage, AuthSuccessMessage } from "./constants";
import { PasswordService } from "../password/password.service";
import { UserService } from "../user/user.service";
import { JWTPayload, JWT } from "../common/interfaces";
import { User } from "../common/entities";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  async login(createLoginRequestDto: CreateLoginRequestDto): Promise<Object> {
    const { email, password } = createLoginRequestDto;
    const user: User = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        AuthErrorMessage.NotRegisteredEmail,
        HttpStatus.BAD_REQUEST
      );
    }

    const isCorrectPassword: boolean =
      await this.passwordService.comparePassword(password, user.password);

    if (!isCorrectPassword) {
      throw new HttpException(
        AuthErrorMessage.WrongPassword,
        HttpStatus.BAD_REQUEST
      );
    }

    const jwtPayload: JWTPayload = {
      email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      message: AuthSuccessMessage.LoginSuccess,
      data: {
        user,
        accessToken,
      },
    };
  }

  async register(
    createRegisterRequestDto: CreateRegisterRequestDto
  ): Promise<Object> {
    let { name, phoneNumber, email, password } = createRegisterRequestDto;
    email = email.toLocaleLowerCase();

    const registeredEmail: User = await this.userService.findUserByEmail(email);
    if (registeredEmail) {
      throw new HttpException(
        AuthErrorMessage.RegisteredEmail,
        HttpStatus.BAD_REQUEST
      );
    }

    password = await this.passwordService.encryptPassword(password);

    const newUser = await this.userService.createUser(
      name,
      phoneNumber,
      email,
      password
    );

    return {
      message: AuthSuccessMessage.RegisterSuccess,
      data: { user: newUser },
    };
  }
}
