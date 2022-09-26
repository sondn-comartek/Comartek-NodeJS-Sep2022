import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async exampleUploadToCloud(file) {
    console.log(file);
    return 'file upload';
  }
}
