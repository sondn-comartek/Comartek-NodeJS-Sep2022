import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'
@Global()
@Module({
  imports: [AuthModule, 
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  MongooseModule.forRoot(process.env.DB),
  
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
