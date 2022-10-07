import { Module, Global, DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HelperModule } from './modules/helper/helper.module';


@Global()
@Module({
})
export class GlobalModule{
  static async register(option: {env: string}):Promise<DynamicModule> {
    console.log("global")
    await ConfigModule.envVariablesLoaded;
    if(process.env.TYPE !== 'migration')

      return {
        module: GlobalModule,
        imports: [
          HelperModule,  
          BullModule.forRoot({
            redis: {
              host: 'localhost',
              port: 6379,
            },
          }),
          JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET,
            signOptions: {
              expiresIn: process.env.EXPIRED_IN
            }
          }),
        BullModule.forRoot({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
        MongooseModule.forRoot(process.env.DB),
       
        ]
      }
 
    return {
      module: GlobalModule,
      imports: [
        HelperModule,  
        BullModule.forRoot({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
        JwtModule.register({
          secretOrPrivateKey: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.EXPIRED_IN
          }
        }),
     
      MongooseModule.forRoot(process.env.DB),
    
      
    ]
    }
  }
}