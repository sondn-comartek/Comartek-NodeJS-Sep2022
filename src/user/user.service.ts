import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userEntity: Model<User>
    ) { }
}
