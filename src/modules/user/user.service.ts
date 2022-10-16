import { BadRequestException, Injectable } from '@nestjs/common'
import { FilterUser } from './dto'
import { UserDocument } from './models'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
   constructor(private readonly userRepository: UserRepository) {}

    async findUsers():Promise<UserDocument[]>{
        return await this.userRepository.FindAll()
    }

   async findUser(filter: FilterUser): Promise<UserDocument> {
      const user =
         Object.keys(filter).length > 0 &&
         (await this.userRepository.FindOne(filter, '-_id -hash'))
      if (!user) throw new BadRequestException('Not found user!')
      return user
   }
}
