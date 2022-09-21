import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/schemas/user.schema';
import { CreateUserInput } from '../shared/inputs/create-user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userSchema: Model<User>) { }

    async createNewUser(createUserInput: CreateUserInput) {
        return await this.userSchema.create(createUserInput)
    }

    async getUserById(id: string) {
        return await this.userSchema.findOne({ id });
    }

    async getUserByEmail(email: string) {
        return await this.userSchema.findOne({ email: email.toLowerCase() })
    }

    async getUserByUserName(userName: string) {
        return await this.userSchema.findOne({ userName: userName.toLowerCase() })
    }

    async updateUserById(id: string) { }

    async deleteUserById(id: string) {
        await this.userSchema.deleteOne({ id })
    }
}
