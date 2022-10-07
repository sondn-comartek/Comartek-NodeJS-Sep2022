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
import * as fse from 'fs-extra'

@Injectable()
export class ImageService {
   private uploadPath = process.cwd() + '/src/storage/images/'
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
      const imageOriginPath = await new Promise(async (resolve, reject) => {
      await fse.ensureDir(this.uploadPath)
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
