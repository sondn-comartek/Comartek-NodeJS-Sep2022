import { Args, Mutation, Resolver, Subscription} from '@nestjs/graphql';
import { UserService } from '../user.service';
import { UserEntity } from '../model/user.entity';
import { JWTAuthGuard } from '../../auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { UseGuards, Inject } from '@nestjs/common'
import { PUB_SUB } from '../../pubSub/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RolesGuard } from '../../auth/role.guard';
@Resolver( () => UserEntity )
export class UserResolver {
  constructor(private readonly userService: UserService,
              @Inject(PUB_SUB) private pubSub: RedisPubSub) {} 

 

}
