import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { resizeHelper } from './helpers/resize.helper'

@Processor('image')
export class ImageConsumer {
   private resizeHelper = resizeHelper
   constructor() {}
   @Process('resize')
   resize({ data }: Job<any>) {
      return this.resizeHelper(data.imageOriginPath, data.shape)
   }
}
