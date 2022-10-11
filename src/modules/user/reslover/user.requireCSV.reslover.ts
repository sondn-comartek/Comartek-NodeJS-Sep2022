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
import { User } from '../../..//decorator/user.decorator';
import { RequireCSVOutput } from '../entities/user.fileCSV.output';
import { AdminCreateBookInput } from 'src/modules/admin/dto/admin.input';
import { UserCSVPushlish } from '../../publishconsum/usercSV.publish';
@Resolver( () => RequireCSVOutput  )
export class UserCSV {
  constructor(private readonly userService: UserService,
              @Inject(PUB_SUB) private pubSub: RedisPubSub,
               private readonly userCSVPublish: UserCSVPushlish,
                ) {} 

  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @Mutation(() => RequireCSVOutput) 
  async requireCSVUsers(@User() user: any) {
   await this.pubSub.publish("onCSVscuccess", {onFileProcessScuccess: {userid: "job.data.id", fileid: "id", message: "prcoess scuccess"}})
    await this.userCSVPublish.pushUserCSV(user.id);
    return {
      status: 200,
      message: "Your require has benn process"
    }
  }

}
