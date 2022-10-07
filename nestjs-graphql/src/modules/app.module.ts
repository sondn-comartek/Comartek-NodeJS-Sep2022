import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule , ConfigService } from '@nestjs/config' ;
import { MongooseModule } from '@nestjs/mongoose';
import { PetModule } from './pet/pet.module';
import { StoreModule } from './store/store.module';
import { PhotoModule } from './photo/photo.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver ,
      autoSchemaFile: true, 
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      } 
    }),
    ConfigModule.forRoot({
      isGlobal : true
    }) ,
    MongooseModule.forRootAsync({
      imports : [ ConfigModule ],
      useFactory : (ConfigService: ConfigService) =>({
        uri : ConfigService.get<string>('MONGODB_URL'),
        useNewUrlParser : true ,
      }),
      inject : [ConfigService]     
    }) ,
    UserModule,
    AuthModule,
    PetModule,
    StoreModule,
    PhotoModule,
  ],
})
export class AppModule {}
