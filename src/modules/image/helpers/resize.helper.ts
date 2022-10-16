import {  InternalServerErrorException } from '@nestjs/common'
import { unlinkSync } from 'fs'
import * as sharp from 'sharp'
import { TypeImage } from '../types/type.enum'

export const resizeHelper = (imageOriginPath: string, shape: number): string => {
   const imageResizedPath = imageOriginPath.split('.')[0] + TypeImage.WEBP
   sharp(imageOriginPath)
      .resize(shape, shape)
      .webp()
      .toFile(imageResizedPath, (err, info) => {
         if (err) throw new InternalServerErrorException(err)
      })
   return imageResizedPath
}
