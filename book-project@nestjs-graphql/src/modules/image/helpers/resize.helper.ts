import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { unlinkSync } from 'fs'
import * as sharp from 'sharp'
@Injectable()
export class ResizeHelper {
    resize(image_path: string, size: number):string {
        const newImagePath = image_path.split('.')[0] + '.webp'
        sharp(image_path)
            .resize(size, size)
            .webp()
            .toFile(  newImagePath , (err , info) => {
                if(err) throw new InternalServerErrorException(err) 
                unlinkSync(image_path)
            })
        return newImagePath ;
    }
}