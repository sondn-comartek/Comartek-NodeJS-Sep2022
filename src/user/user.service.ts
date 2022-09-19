import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../common/entities";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userEntity: Model<User>
  ) { }

  async findUserById(id: string): Promise<User | null> {
    return await this.userEntity.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const filter = { email: email.toLowerCase() };
    return await this.userEntity.findOne(filter);
  }

  async createUser(
    name: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Promise<User> {
    email = email.toLowerCase();

    return await this.userEntity.create({
      name,
      phoneNumber,
      email: email.toLowerCase(),
      password,
    });
  }
}
