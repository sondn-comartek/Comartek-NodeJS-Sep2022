import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../utils/hash-password';
import { Role } from './roles/role.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    // private readonly authService: AuthService

  ){}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existedUser = await this.user.findOne({ email: createUserDto.email });
    if (existedUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    
    const createdUser = await this.user.create({ ...createUserDto, hashedPassword: hashedPassword, role: Role.CUSTOMER });
    if (createdUser) {
      // const token = this.authService.login(createdUser.email, createdUser.hashedPassword);
      return {
        message: `This action adds a new user with userId #${createdUser._id}`,
        data: createdUser,
        // token: token
      };
    }
    throw new Error('Cannot create an user');
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<any> {
    const user = await this.user.findOne({ email: email })
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
