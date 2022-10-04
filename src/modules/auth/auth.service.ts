import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { UserDocument } from 'src/modules/schema/user.schema';
import { SignUpInput } from './dto/signup.input';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
              private readonly jwtService: JwtService,
              private userService: UserService) {}
  async createNewUser(signupInput: SignUpInput) {  
    const {username: username, password: rawPassword} = signupInput
    const isExistUser = await this.userService.getUserModel().findOne({username: username})
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
    return await this.userService.getUserModel().create({...signupInput, password: hashedPassword})
  }
  async verifiUser(username: string, password: string): Promise<any> {
    // for store userdata if user existed 
    let user: UserDocument = null
    
    const isUserExist = await this.userService.getUserModel().findOne({username: username})
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
        return {
          id: user._id.toString(),
          role: user.role
        }
      return null
    }
    
    return null
  }
  async login(username: string, password: string): Promise<string | null> {
    const user = await this.verifiUser(username, password);
    if(user)
      return await this.jwtService.signAsync(
        {username: username, id: user.id, role: user.role},
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.EXPIRED_IN
        }
        )
    return null
  }
  async getUserByName(name: string) {
    return this.userService.getUserModel().findOne({name: name});
  }
 
}
