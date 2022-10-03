import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadService } from './fileupload.service';
import { fileUploadSchema } from './model/fileupload.model';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'FileUpload', schema: fileUploadSchema }])
    ],
    providers: [FileUploadService],
    exports: [FileUploadService]
})
export class FileUploadModule { }