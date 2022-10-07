import {
   BadRequestException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common'
import { LoginInput, RegiserInput } from './dto'
import * as argon from 'argon2'
import { GenTokenTool } from './tools/'
import { UserDocument } from '../user/models'
import { UserStatus } from '../user/types'
import { UserRepository } from '../user/user.repository'
import { v4 } from 'uuid'
import { TokenRepository } from './jwt.repository'
import { TokenDocument } from './models'

@Injectable()
export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly genTokenTool: GenTokenTool,
      private readonly tokenRepository: TokenRepository,
   ) {}

   async findTokenByUserid(userid: string): Promise<TokenDocument> {
      return await this.tokenRepository.FindOne({
         userid: userid,
      })
   }

   async signup({
      password,
      email,
      username,
   }: RegiserInput): Promise<UserDocument | Record<string, unknown>> {
      const userHaveThisUsername = await this.userRepository.FindOne({
         username: username,
      })
      if (userHaveThisUsername)
         throw new BadRequestException({
            success: false,
            message: username + ' have been registed!',
         })
      const userHaveThisEmail = await this.userRepository.FindOne({
         email: email,
      })
      if (userHaveThisEmail)
         throw new BadRequestException({
            success: false,
            message: email + ' have been registed!',
         })
      const hash = await argon.hash(password)
      const user = await this.userRepository.Create({
         userid: v4(),
         email: email,
         username: username,
         hash: hash,
      })
      const { accessToken, refreshToken } = this.genTokenTool.generateMany({
         userid: user.userid,
         email: user.email,
         role: user.role,
         status: user.status,
      })
      await this.tokenRepository.Create({
         userid: user.userid,
         accessToken,
         refreshToken,
      })
      return user
   }

   async login({ email, password }: LoginInput): Promise<UserDocument> {
      const user = await this.userRepository.FindOne({
         email: email,
      })
      const correct = user && (await argon.verify(user.hash, password))
      if (!correct) throw new UnauthorizedException('Login info incorrect!')
      if (user?.status === UserStatus.INACTIVE)
         throw new UnauthorizedException('User inactive!')
      const { accessToken, refreshToken } = this.genTokenTool.generateMany({
         userid: user.userid,
         email: user.email,
         role: user.role,
         status: user.status,
      })
      const tokens = await this.tokenRepository.FindOneAndUpdate(
         {
            userid: user.userid,
         },
         { accessToken, refreshToken },
         { new: true },
      )
      if(!tokens) await this.tokenRepository.Create({
        userid: user.userid,
        accessToken,
        refreshToken,
     })
      return user
   }
}
