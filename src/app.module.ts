import { Module, Global } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RootResolver } from './root.reslover';

@Global()
@Module({
  providers: [AppService],
  imports: [ 
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true,
    include: [RootResolver, AuthModule, UserModule ]
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  MongooseModule.forRoot(process.env.DB),
  
  
  ],
  controllers: [AppController],
  

})
export class AppModule {}
