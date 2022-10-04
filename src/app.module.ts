import { Module, Global } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { HelperModule } from './modules/helper/helper.module';
import { BullModule } from '@nestjs/bull';
import { PublishConsumModule } from './modules/publishconsum/publishconsum.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { GlobalModule } from './global.module';
import { BookModule } from './modules/book/book.module';



@Module({
  providers: [AppService],
  imports: [
  GlobalModule,
  AuthModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true,
    include: [AuthModule, AdminModule, UserModule ]
  }),
  MongooseModule.forRoot(process.env.DB),
  AdminModule,
  HelperModule,
  PublishConsumModule,
  UserModule,
  BookModule,
  ],
  controllers: [AppController],
  exports: []
})
export class AppModule {}


