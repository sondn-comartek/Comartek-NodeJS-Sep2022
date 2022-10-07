import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schema/user.schema';
import { HelperService } from './helper.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'user', schema: UserSchema
        }
    ]),
  ],
  providers: [HelperService]
})
export class HelperModule {
}
