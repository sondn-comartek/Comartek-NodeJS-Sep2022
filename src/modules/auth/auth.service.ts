import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto';
import { UserRepository } from '../user/user.repository';
import * as argon2 from 'argon2'
import { LoginDto } from './dto';
import { LoginMessages, RegisterMessages } from './constant';
import { TokenHelper } from './helpers';
import { LoginResponse, RegisterResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserRepositoy: UserRepository,
    private readonly TokenHelper: TokenHelper
  ) { }
  async SignUp(RegisterDto: RegisterDto): Promise< RegisterResponse > {
    try {
      const User = await this.UserRepositoy.FindOne(
        { email: RegisterDto.email },
        { email: 1 },
        { lean: true })
      if (User) throw {
        message: RegisterDto.email + " " + RegisterMessages.UserExisted
      }
      const Hash = await argon2.hash(RegisterDto.password)
      const { email } = await this.UserRepositoy.Create(
        {
          email: RegisterDto.email,
          hash: Hash
        }
      )
      return {
        message: email + " " + RegisterMessages.RegisterSuccess,
        success: true,
        statusCode: HttpStatus.CREATED
      };
    } catch (err) {
      throw new ForbiddenException(
        {
          message: err.message??=err,
          success: false,
          statusCode: HttpStatus.FORBIDDEN
        },
      )
    }
  }

  async SignIn(LoginDto: LoginDto): Promise< LoginResponse > {
    try {
      const User = await this.UserRepositoy.FindOne(
        { email: LoginDto.email },
        { email: 1, hash: 1 , role : 1},
        { lean: true }
      )
      if (!User) throw {
        message : LoginMessages.InfoUserIncorrect
      }
      const Correct = await argon2.verify(User.hash, LoginDto.password)
      if (!Correct) throw {
        message : LoginMessages.InfoUserIncorrect
      }
      const AccessToken = this.TokenHelper.generateOne({
        email : User.email ,
        role : User.role
      }, 'ACCESS_TOKEN' )
      return {
        success : true ,
        message : LoginMessages.LoginSuccess ,
        accessToken : AccessToken ,
        statusCode : HttpStatus.ACCEPTED
      };
    } catch (err) {
      throw new UnauthorizedException({
        message: err.message??=err,
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED
      })
    }
  }
}