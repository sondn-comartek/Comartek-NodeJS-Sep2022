import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import * as sharp from 'sharp';
import { FileUpload } from './interface/fileupload.interface';
import { FileUploadModel } from './model/fileupload.model';

@Injectable()
export class FileUploadService {

    constructor(@InjectModel('FileUpload') private readonly fileUploadModel: Model<FileUploadModel>) { }
    async convertImage(
        input,
        outputThumb,
        outputPreview,
    ) {

        await sharp(input)
            .resize(200, 200)
            .webp({ lossless: true })
            .toFile(outputThumb);

        await sharp(input)
            .webp({ lossless: true })
            .toFile(outputPreview);


    }

    async uploadImage(img: Promise<FileUpload>, type: string, obj: any, objQueue: Queue) {
        let { createReadStream, filename } = await img;
        new Promise(async (resolve) => {
            createReadStream()
                .pipe(createWriteStream(join(process.cwd(), `./src/modules/${type}/img/origin/${obj.id}.webp`)))
                .on('finish', async () => {
                    await objQueue.add(
                        'convertImage',
                        {
                            input: join(process.cwd(), `./src/modules/${type}/img/origin/${obj.id}.webp`),
                            outputThumb: join(process.cwd(), `./src/modules/${type}/img/thumb/${obj.id}.webp`),
                            outputPreview: join(process.cwd(), `./src/modules/${type}/img/preview/${obj.id}.webp`)
                        }
                    )
                    resolve({})
                }
                )
                .on('error', () => {
                    new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
                });
        });
        return await this.fileUploadModel.create({
            src: `./src/modules/${type}/img/origin/${obj.id}.webp`,
            type
        })
    }

    async findImgsByIds(ids: readonly string[]) {

        const fileUploads = await this.fileUploadModel.find({ _id: { $in: ids } })
        const mappedfileUploads = ids.map(
            (id) =>
                fileUploads.find((fileUpload) => fileUpload.id === id) ||
                new Error(`Could not load fileUpload ${id}`),
        );
        // console.log('mappedUsers', mappedUsers);
        return mappedfileUploads
    }

    async findImgsByIDs(ids: readonly string[]) {
        return await this.fileUploadModel.find({ _id: { $in: ids } })
    }
}



