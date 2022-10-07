import { Module, Global } from '@nestjs/common';

import { BullModule, BullQueueEvents } from '@nestjs/bull';
import { join } from 'path';
import { ImagePublish } from './image.publish';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from 'src/modules/schema/media.schema';
import { DynamicModule } from '@nestjs/common/interfaces/modules';
import { ConfigModule } from '@nestjs/config';
// import { UserCSVConsumer } from './usercsv.consumer';
import { UserCSVPushlish } from './usercSV.publish';
import { UserCSVConsumer } from './usercsv.consumer';
import { HelperService } from '../helper/helper.service';
import { UserSchema } from '../schema/user.schema';
@Global()
@Module({})
export class PublishConsumModule {
   static async register(opstion: {env: string}): Promise<DynamicModule> {
    console.log("load pubsub")
    await ConfigModule.envVariablesLoaded;
    if(process.env.TYPE === 'migration')
      return {
        module: PublishConsumModule,
        imports: [
          MongooseModule.forFeature(
            [
              {
                name: 'user', schema: UserSchema
              }
          ]),
          BullModule.registerQueue({
            name: 'image',
            processors: [join(__dirname, 'imagies.childprocess.ts')],
          }),
          BullModule.registerQueue({
            name: 'usercsv',
          }),
        ],
        providers: [ ImagePublish,  UserCSVPushlish, UserCSVConsumer, HelperService],
        exports: [ImagePublish, UserCSVPushlish]
      }
    return {
      module: PublishConsumModule,
      imports: [
        MongooseModule.forFeature(
          [
            {
              name: 'user', schema: UserSchema
            }
        ]),
        BullModule.registerQueue({
          name: 'image',
          processors: [join(__dirname, 'imagies.childprocess.js')],
        }),
        BullModule.registerQueue({
          name: 'usercsv'
        }),
      ],
      providers: [ ImagePublish, UserCSVPushlish, UserCSVConsumer, HelperService],
      exports: [ImagePublish, UserCSVPushlish]
    }
  }
}
