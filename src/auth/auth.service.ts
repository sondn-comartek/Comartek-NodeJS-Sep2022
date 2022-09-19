import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService} from '@nestjs/jwt'
import {compare, hash} from 'bcrypt'
interface UserAuthInterface {
  name: string,
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string): Promise<UserAuthInterface | null> {
    const user = await this.usersService.findUser(username);
    if(user)
      return {name: user.username, role: user.role}
    return null
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.usersService.findUser(username)
    if(!user)
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'user not exist',
      }, HttpStatus.UNAUTHORIZED)
    const hashedPassword = user.password
    const result = await compare(password, hashedPassword)
    if(result) 
      return this.jwtService.sign({username: username, role: user.role})
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: 'password not correct',
    }, HttpStatus.UNAUTHORIZED)
  }

  async register(username:string, password: string): Promise<boolean> {
    const user = await this.usersService.findUser(username)
    if(user) 
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'user name existed',
      }, HttpStatus.UNAUTHORIZED)
    const hashedPassword =await hash(password, 10)
    await this.usersService.createUser(username, hashedPassword)

    return true
  }
}
