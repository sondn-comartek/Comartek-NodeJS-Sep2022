import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './reslover/user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../../modules/schema/book.schema';
import { UserSchema } from '../../modules/schema/user.schema';
import { UserFileResolver } from './reslover/user.file.reslover';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/role.guard';
import { RequireCSVOutput } from './entities/user.fileCSV.output';
import { UserCSV } from './reslover/user.requireCSV.reslover';
import { PublishConsumModule } from '../publishconsum/publishconsum.module';
import { UserCSVPushlish } from '../publishconsum/usercSV.publish';
import { HelperModule } from '../helper/helper.module';
@Module({
  imports: [ 
    HelperModule,
    MongooseModule.forFeature(
      [
        {
          name: 'user', schema: UserSchema
        }
    ]),
  
  ],
  providers: [UserResolver, UserFileResolver , UserCSV, UserService, RolesGuard, JwtService],
  exports: [UserService]
})
export class UserModule {}
