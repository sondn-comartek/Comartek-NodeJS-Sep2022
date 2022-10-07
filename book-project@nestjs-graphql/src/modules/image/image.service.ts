import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Queue } from 'bull'
import { createWriteStream, mkdirSync, open } from 'fs'
import { extname } from 'path'
import { genFileId } from 'src/ultils'
import { UploadImageInput } from './dto'
import { ImageRepository } from './image.repository'
import { Image, ImageDocument } from './models'

@Injectable()
export class ImageService {
    private uploadPath = process.cwd() + '/src/uploads/'
    constructor(
        @InjectQueue('image') private imageQueue: Queue,
        private configService: ConfigService,
        private imageRepository: ImageRepository,
    ) {}
    async upload({
        description,
        file,
        shape,
    }: UploadImageInput): Promise<ImageDocument> {
        const { filename, createReadStream } = await file
        const image_id = genFileId(description)
        const imageOriginPath = await new Promise((resolve, reject) => {
            open(this.uploadPath, (err) => {
                if (err) mkdirSync(this.uploadPath)
                createReadStream()
                    .pipe(
                        createWriteStream(
                            this.uploadPath + image_id + extname(filename),
                        ),
                    )
                    .on('finish', () => {
                        resolve(this.uploadPath + image_id + extname(filename))
                    })
                    .on('error', (err) => {
                        reject(err)
                    })
            })
        })
        this.imageQueue.add('resize', {
            imageOriginPath,
            shape,
        })
        return await this.imageRepository.Create({
            image_id,
            image_url: this.configService.get<string>('HOST_URL') + image_id,
            description,
            shape,
        })
    }
}