import { Args, Mutation, Resolver, Subscription} from '@nestjs/graphql';
import { UserService } from '../user.service';
import { UserEntity } from '../model/user.entity';
import { JWTAuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../../decorator/role.decorator';
import { Role } from '../../../enum/role.enum';
import { UseGuards, Inject } from '@nestjs/common'
import { PUB_SUB } from '../../pubSub/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RolesGuard } from '../../auth/role.guard';
import { FileMessageOutput } from '../entities/user-file.output';
import { HelperService } from 'src/modules/helper/helper.service';
@Resolver( () => FileMessageOutput )
export class UserFileResolver {
  constructor(private readonly userService: UserService,
              @Inject(PUB_SUB) private pubSub: RedisPubSub,
              ) {} 
  

  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @Subscription(() => FileMessageOutput, {
    async filter(payload, variables, context) {
      return payload.onFileProcessScuccess.userid === context.req.user.id
    }
  })
  onFileProcessScuccess() {
    return this.pubSub.asyncIterator('onCSV')
  }
 

}
