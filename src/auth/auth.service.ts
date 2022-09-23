import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { SignUpInput } from './dto/signup.input';
import { hashSync, compareSync } from 'bcrypt';
import { LoginException } from 'src/eceptio/loginexception';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>,
              private jwtService: JwtService) {

  }
  async createNewUser(signupInput: SignUpInput) {  
    const {username: username, password: rawPassword} = signupInput
    const isExistUser = await this.userModel.findOne({username: username})
                                            .then(result => {
                                              if(!result)
                                                return false
                                                return true 
                                            })
    if(isExistUser) 
      throw new HttpException({
        message: "username existed"
      }, HttpStatus.BAD_REQUEST)
    const hashedPassword = hashSync(rawPassword, parseInt(process.env.SALT_ROUND))
    return new this.userModel({...signupInput, password: hashedPassword}).save()
  }
  async verifiUser(username: string, password: string): Promise<string | null> {
    // for store userdata if user existed 
    let user: UserDocument = null
    
    const isUserExist = await this.userModel.findOne({username: username})
                                  .then(data => {
                                    user = data
                                    if(data)
                                      return true
                                    return false
                                  })
    if(isUserExist) {
      const {password: hashedPassword} = user 
      const isMatchPassword = compareSync(password, hashedPassword)
      if(isMatchPassword) 
        return user._id.toString()
      return null
    }
    
    return null
  }
  async login(username, password): Promise<string | null> {
    const userID = await this.verifiUser(username, password);
    if(userID)
      return this.jwtService.signAsync({username: username, userID: userID}, {secret: process.env.JWT_SECRET,
                                                              expiresIn: process.env.EXPIRED_IN})
    return null
  }
  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return 1;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
