import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  BookDocument } from '../schema/book.schema';
import { AdminCreateBookInput } from './dto/admin.input';
import { FileUpload } from '../interface/FileUpload.interface';
import { ImagePublish } from '../publishconsum/image.publish';
import { UserDocument } from '../schema/user.schema';
@Injectable()
export class AdminService {
  constructor(@InjectModel('book') private bookModel: Model<BookDocument>,
              @InjectModel('user') private userModel: Model<UserDocument>,
              private imagePushlish: ImagePublish) {
  }
  
  /**
   * For push imagies as buffer to queue base on redis for image processing 
   * (image processing - CPU intensive )
   * @param fileUpload 
   * @param ids // when process images done, imagies location will be store to these book
   * @returns 
   */
  private async storeImgaes(filesUpload: FileUpload[], ids: string[])
  : Promise<null> {
    filesUpload.forEach(async fileUpload => {
      const {createReadStream, filename} = fileUpload
      const stream = createReadStream()
      const bufs = []
     
      stream.on('data', (d) => {
        bufs.push(d)
      })
      stream.on('end',async () => {
        const buf = Buffer.concat(bufs)
        this.imagePushlish.pushImg(buf, ids, filename)
        return 
      })
    })
    
    return null
  }


  /**
   * Return ids of books that added to book libarary, image stream will be pass to queue
   * and wait to be process, so it may not posibble to reach the image in few minutes
   * 
   * @param number number of book be added to library
   * @param book book infomation 
   * @returns 
   */
  async AddBook(booksAdded: AdminCreateBookInput ) {
    let arrayPromise: Promise<any>[] = []

    // for creating book concurrently
    for(let i = 0; i < booksAdded.number; i++){
      arrayPromise.push(new Promise(async (res, rej) => {
        res(await new this.bookModel({name: booksAdded.name, categorys: booksAdded.categorys,
                                      episode: booksAdded.episode}).save())
      }))
    }
    const result = await Promise.all(arrayPromise)
    
    const ids = result.map(book => book.id)  
    const imagesUpload = await Promise.all(booksAdded.images)
    this.storeImgaes(imagesUpload, ids)

    

    return result.map(data => data.id)
  }

  async getAllUser() {
    return this.userModel.find({});
  }

  async getUserByIds(ids: string[] | readonly string[]) {
    return this.userModel.find({_id: ids})
  }
  
  async findBookUserBorrow(ids: string | String[] | readonly string[]) {
    if(ids instanceof String) {
      return  this.bookModel.find({borrowed: true, userborrow: {$in: [ids]}})
    }
    else if(ids instanceof Array) {
      return this.bookModel.find({borrowed: true, userborrow: {$in: [...ids]}})
    }
  }
}
