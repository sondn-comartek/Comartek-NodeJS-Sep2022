import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginRequestDto } from './dto/create-login-request.dto';
import { CreateRegisterRequestDto } from './dto/create-register-request.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userEntity: Model<User>,
    private readonly jwtService: JwtService) { }

  async login(createLoginRequestDto: CreateLoginRequestDto): Promise<Object> {
    const { email, password } = createLoginRequestDto;
    const filter = { email: email.toLowerCase() };
    const user = await this.userEntity.findOne(filter);

    if (user) {
      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (isCorrectPassword) {
        return { user }
      }

      return {
        error: "Password is incorrect"
      }
    }

    return {
      error: "Email is not registered"
    }
  }

  async register(createRegisterRequestDto: CreateRegisterRequestDto): Promise<Object> {
    const { email, password } = createRegisterRequestDto;
    const filter = { email: email.toLowerCase() };
    const registeredEmail = await this.userEntity.findOne(filter);

    if (registeredEmail) {
      return {
        error: "Email is already registerd"
      }
    }

    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const newUser = await this.userEntity.create({
      ...createRegisterRequestDto,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    return {
      user: newUser
    }
  }
}
