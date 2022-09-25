import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon  from 'argon2';
import { GetUserArg, UpdateUserInput } from './dto';
import { User, UserDocument } from './model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}

  async getUser(getUserArg:GetUserArg):Promise<UserDocument>{
    const user = await this.userRepository.FindOne(
      getUserArg,
      { hash : 0 } ,{ lean : true}
    )
    if(!user) throw new NotFoundException()
    return user ;
  }
  async updateUser(updateUserInput: UpdateUserInput , currentUser: User){
    const { username , email , ...rest } = updateUserInput
    const userHaveThisEmail = await this.userRepository.FindOne({
      email : email ,
    })
    if(userHaveThisEmail) throw new BadRequestException()
    const userHaveThisUsername = await this.userRepository.FindOne({
      username : username ,
    })
    if(userHaveThisUsername) throw new BadRequestException()
    return await this.userRepository.FindOneAndUpdate({
      userid : currentUser.userid
    } , updateUserInput  , { new : true })
  }

  async deleteUser(password: string , currentUser: User ):Promise<UserDocument>{
    const { hash } = await this.userRepository.FindOne({
      userid : currentUser.userid
    })
    const correct = await argon.verify(hash , password)
    if(!correct) throw new UnauthorizedException()
    return await this.userRepository.FindOneAndUpdate({
      userid : currentUser.userid
    } , { status : 'inactive'} , { new : true });
  } 
}
