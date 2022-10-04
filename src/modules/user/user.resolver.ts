import { Args, Mutation, Resolver} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './model/user.entity';
import { JWTAuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { UseGuards } from '@nestjs/common'
@Resolver( () => UserEntity )
export class UserResolver {
  constructor(private readonly userService: UserService,) {} 

}
