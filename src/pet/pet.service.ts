import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { UploadService } from 'src/upload/upload.service';
import { Model } from 'mongoose';
import { Pet } from 'src/shared/schemas';

@Injectable()
export class PetService {
    constructor(
        @InjectModel(Pet.name) private readonly photoSchema: Model<Pet>,
        private readonly photoService: PhotoService,
        private readonly uploadService: UploadService) { }
}
