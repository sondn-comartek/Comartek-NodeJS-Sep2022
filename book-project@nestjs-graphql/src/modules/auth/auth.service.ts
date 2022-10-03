import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginInput, RegiserInput } from './dto'
import * as argon from 'argon2'
import { GenTokenTool } from './tools/'
import { JwtTokens } from './models'
import { UserDocument } from '../user/models'
import { UserStatus } from '../user/types'
import { UserRepository } from '../user/user.repository'
import { v4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genTokenTool: GenTokenTool,
  ) {}
  async signup({
    password,
    email,
    username,
  }: RegiserInput): Promise<UserDocument | Record<string, unknown>> {
    const userHaveThisUsername = await this.userRepository.FindOne(
      {
        username: username,
      }
    )
    if (userHaveThisUsername)
      throw new BadRequestException({
        success: false,
        message: username + ' have been registed!',
      })
    const userHaveThisEmail = await this.userRepository.FindOne(
      {
        email: email,
      },
    )
    if (userHaveThisEmail)
      throw new BadRequestException({
        success: false,
        message: email + ' have been registed!',
      })
    const hash = await argon.hash(password)
    return await this.userRepository.Create({
      userid: v4(),
      email: email,
      username: username,
      hash: hash,
    })
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<JwtTokens | Record<string, unknown>> {
    const user = await this.userRepository.FindOne(
      {
        email: email,
      }
    )
    const correct = user && (await argon.verify(user.hash, password))
    if (!correct) throw new UnauthorizedException('Login info incorrect!')
    if (user?.status === UserStatus.INACTIVE)
      throw new UnauthorizedException('User inactive!')
    delete user.hash
    return this.genTokenTool.generateMany(user)
  }
}
