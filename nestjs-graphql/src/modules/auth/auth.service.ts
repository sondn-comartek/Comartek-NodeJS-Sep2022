import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginInput, RegiserInput } from './dto';
import * as argon from 'argon2';
import { v4 } from 'uuid';
import { RegisterMessage } from './types';
import { GenTokenTool } from './tools/';
import { JwtTokens } from './models';
import { UserDocument } from '../user/model';
import { UserStatus } from '../user/types';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genTokenTool: GenTokenTool
  ) { }
  async signup(regiserInput: RegiserInput): Promise<UserDocument> {
    const { password, email , username , ...rest } = regiserInput
    const userHaveThisUsername = await this.userRepository.FindOne({
      username: username ,
    }, null, { lean: true })
    if (userHaveThisUsername) throw new UnauthorizedException({
      success: false,
      message: username + RegisterMessage.usernameUsed
    })
    const userHaveThisEmail = await this.userRepository.FindOne({
      email: email
    }, null, { lean: true })
    if (userHaveThisEmail) throw new UnauthorizedException({
      success: false,
      message: email + RegisterMessage.userExisted
    })
    const hash = await argon.hash(password)
    return await this.userRepository.Create(
      {
        userid: v4(),
        email: email,
        username : username ,
        hash: hash,
        ...rest
      }
    )
  }

  async login(loginInput: LoginInput): Promise<JwtTokens> {
    const { hash , ...rest} = await this.userRepository.FindOne({
      email: loginInput.email
    } , null , { lean : true})
    if (!hash || rest?.status === UserStatus.INACTIVE) throw new UnauthorizedException()
    const correct = await argon.verify( hash, loginInput.password)
    if (!correct) throw new UnauthorizedException()
    return this.genTokenTool.generateMany(rest)
  }
}
