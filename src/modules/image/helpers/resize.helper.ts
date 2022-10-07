import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { unlinkSync } from 'fs'
import * as sharp from 'sharp'
import { TypeImage } from '../types/type.enum'
@Injectable()
export class ResizeHelper {
    resize(imageOriginPath: string, size: number):string {
        const imageResizedPath = imageOriginPath.split('.')[0] + TypeImage.WEBP
        sharp(imageOriginPath)
            .resize(size, size)
            .webp()
            .toFile( imageResizedPath , (err , info) => {
                if(err) throw new InternalServerErrorException(err) 
            })
        return imageResizedPath ;
    }
}