import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserLoginInput, UserSignupInput } from "./input/user.input";
import * as bcrypt from 'bcrypt';
import { User } from "./model/user.model";
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }
    async signup(userSignupInput: UserSignupInput) {
        return await this.userModel.create(userSignupInput)
    }

    async login({ gmail, password }: UserLoginInput) {

        const user = await this.findUserByGmail(gmail)
        if (!user) {
            return null
        }
        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return null
        }
        return user
    }

    async findUserByGmail(gmail: string) {
        return await this.userModel.findOne({ gmail })
    }

    async findUserById(id: string) {
        const user = await this.userModel.findOne({ _id: id })
        return user
    }

    async findUsers() {
        return await this.userModel.find({ role: 'user' })
    }

    async findUserByIds(ids: readonly string[]) {
        const users = await this.userModel.find({ _id: { $in: ids } })
        const mappedUsers = ids.map(
            (id) =>
                users.find((user) => user.id === id) ||
                new Error(`Could not load user ${id}`),
        );
        // console.log('mappedUsers', mappedUsers);
        return mappedUsers;
    }
}