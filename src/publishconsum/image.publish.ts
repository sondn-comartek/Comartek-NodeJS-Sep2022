import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class ImagePublish {
  constructor( @InjectQueue('image') private imageQueue: Queue) {

  }
  async pushImg(buf: Buffer, ids: string[], filename: string) {
    this.imageQueue.add({
      image: buf,
      ids: ids,
      filename: filename
    })
  }
}
