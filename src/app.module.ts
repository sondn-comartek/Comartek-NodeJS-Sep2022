import { Module} from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { HelperModule } from './modules/helper/helper.module';
import { PublishConsumModule } from './modules/publishconsum/publishconsum.module';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './global.module';
import { BookModule } from './modules/book/book.module';



@Module({
  providers: [AppService],
  imports: [
  GlobalModule,
  AuthModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    subscriptions: {
      'graphql-ws': true
    },
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true,
    include: [AuthModule, AdminModule, UserModule, BookModule ]
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


