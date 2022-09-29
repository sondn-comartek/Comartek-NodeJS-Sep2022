import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createWriteStream, mkdirSync, open } from 'fs';
import { extname } from 'path';
import { genImageId } from 'src/ultils';
import { UploadImageInput } from './dto';
import { Image } from './models';

@Injectable()
export class ImageService {
    private uploadPath = process.cwd() + '/src/uploads/'
    constructor(
        @InjectQueue('image') private imageQueue: Queue
        ){}
   
    async upload({description, file , size }:UploadImageInput):Promise<Image>{
        const { filename , createReadStream  } = await file ;
        const image_id = genImageId(description)
        const image_path = await new Promise( (resolve , reject) => {
            open(this.uploadPath , (err) => {
                if(err) mkdirSync(this.uploadPath)
                createReadStream()
                    .pipe(createWriteStream(this.uploadPath + image_id + extname(filename) ))
                    .on('finish' , () => {
                        resolve(this.uploadPath + image_id + extname(filename) ) 
                    })
                    .on('error' , (err) => {
                        reject(err)
                    })
            } )
        })
        this.imageQueue.add('resize' , {
            image_path , 
            size
        } )
        return {
            description ,
            image_id : image_id ,
            image_url : 'xnxx/' + image_id ,
        };
    }
}
