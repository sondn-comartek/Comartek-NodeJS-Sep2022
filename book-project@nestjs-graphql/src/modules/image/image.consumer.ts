import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ResizeHelper } from './helpers/resize.helper';

@Processor('image')
export class ImageConsumer {
    constructor(private resizeHelper: ResizeHelper){}
    @Process('resize')
    resize( {data}:Job<any>) {
        return this.resizeHelper.resize( data.image_path , data.shape );
    }
}
