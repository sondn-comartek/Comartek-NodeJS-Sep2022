import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) {}

  async findByCondition(condition: any): Promise<User[]> {
    return await this.userSchema.find(condition);
  }

  async findAll(queryArgsInput?: QueryArgsInput): Promise<User[]> {
    return await this.userSchema.find(
      {},
      {},
      {
        limit: queryArgsInput.limit,
        skip: queryArgsInput.skip,
      },
    );
  }

  async findById(id: string): Promise<User> {
    return await this.userSchema.findById(id);
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return await this.userSchema.find({ _id: { $in: ids } });
  }

  async findByUserName(userName: string): Promise<User> {
    return await this.userSchema.findOne({ userName: userName.toLowerCase() });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userSchema.findOne({ email: email.toLowerCase() });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    let { userName, email } = createUserInput;
    userName = userName.toLowerCase();
    email = email.toLowerCase();

    return await this.userSchema.create({
      ...createUserInput,
      userName,
      email,
    });
  }

  async applyReceiveNewBookInfo(userId: string): Promise<User> {
    const isApply = (await this.userSchema.findById(userId))
      .isApplyReceiveNewBookInfo;
    if (isApply) {
      throw new BadRequestException('Already apply');
    }

    return await this.userSchema.findOneAndUpdate(
      { _id: userId },
      { $set: { isApplyReceiveNewBookInfo: true } },
      { new: true },
    );
  }

  async ignoreReceiveNewBookInfo(userId: string): Promise<User> {
    const isApply = (await this.userSchema.findById(userId))
      .isApplyReceiveNewBookInfo;
    if (isApply) {
      return await this.userSchema.findOneAndUpdate(
        { _id: userId },
        { $set: { isApplyReceiveNewBookInfo: false } },
        { new: true },
      );
    }

    throw new BadRequestException('Already ignore');
  }
}
