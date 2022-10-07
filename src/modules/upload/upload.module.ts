import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadImage, UploadImageSchema } from './entities/upload.entity';
import { UploadMutation } from './resolvers/mutations.resolver';
import { UploadQuery } from './resolvers/queries.resolver';

@Module({
  providers: [UploadQuery, UploadMutation, UploadService],
  imports: [
    MongooseModule.forFeature([
      { name: UploadImage.name, schema: UploadImageSchema },
    ]),
  ],
  exports: [UploadService],
})
export class UploadModule {}
