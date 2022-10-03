
import { Job, DoneCallback } from 'bull';
import { Collection, Mongoose } from 'mongoose';
import { BookSchema } from '../schema/book.schema';
import * as dotenv from "dotenv";
import * as sharp from 'sharp';
import {v4} from 'uuid'
import { MediaSchema } from 'src/schema/media.schema';
import { SignInOutput } from 'src/auth/entities/auth.output';

export default async function (job: Job, cb: DoneCallback) {
  console.log(`[${process.pid}]`);
  dotenv.config({ path: __dirname+'/.env'});
  const {image, filename, ids} = job.data
  const buffer = Buffer.from(image)
  const uuid = v4()
  const extendtion = filename.split(".").at(-1)


  
  // store raw images
  const rawFileName = `${uuid}.${extendtion}`
  await sharp(buffer)
        .toFile(__dirname + `/../../upload/${rawFileName}`)

  // store resize file
  const resizeFileName = `resize-320-${uuid}.webp`
  await sharp(buffer)
        .resize(320)
        .toFile(__dirname + `/../../upload/${resizeFileName}`)

    
  const images: string[] = [rawFileName, resizeFileName]

  const mg = new Mongoose()
  
  await mg.connect(process.env.DB)
  const Book = mg.model('book', BookSchema);
  const Media = mg.model('media', MediaSchema)
  const md = new Media({rawImg: rawFileName, resizeImg: resizeFileName})
  await md.save()
  await Book.updateMany({_id: ids}, {$push: {images: md.id}})
  cb(null, 'done');
}
