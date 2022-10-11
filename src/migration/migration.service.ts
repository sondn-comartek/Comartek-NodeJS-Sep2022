import * as mongo from  'mongodb'
import * as fs from "fs"
import { Injectable } from '@nestjs/common/decorators';
import { BookService } from '../modules/book/book.service';
import { OrderService } from '../modules/order/order.service';
import mongoose, { Model } from 'mongoose';
import { UserService } from '../modules/user/user.service';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { MigraionDocument } from './model/migration.schema';
import { Config } from 'apollo-server-express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MigrationService {
  constructor( 
                private readonly bookService: BookService,
                private readonly orderService: OrderService,
                private readonly userService: UserService,
                @InjectModel('migration') readonly migrationModel: Model<MigraionDocument>,
                ) 
  {
   
  }
  readJson(filename: string) {
    const data = fs.readFileSync(__dirname + `/sampledb/${filename}.json`);
    const docs = JSON.parse(data.toString());
    return docs
  }
  async migrationCollection(schema)  {
    const jsonDatas = this.readJson(schema)
    if(schema === 'orders') {
      await Promise.all(jsonDatas.map(async (jsonData) => {
        const orderModel =  this.orderService.getOrderModel()
        const orders =  await (await orderModel.create({bookid: jsonData.bookid, userid: jsonData.userid, status: jsonData.status})).save()
        await this.bookService.convertOrderCreateAtToNumber(orders);
        return orders
      }))
     
       return 
    }
    if(schema === 'books') {
      await Promise.all(jsonDatas.map(async (jsonData) => {
        const bookModel =  this.bookService.getBookModel()
        return await bookModel.create({name: jsonData.name, categorys: jsonData.categorysd,
                                      episode: jsonData.episode, images: jsonData.images,
                                      borrowed: jsonData.borrowed, userborrow: jsonData.userborrow,
                                      status: jsonData.status })
       }))
       return 
    }
    if(schema === 'users') {
      await Promise.all(jsonDatas.map(async (jsonData, index) => {
        const userModel =  this.userService.getUserModel();
        if(index === 0 )
          return await userModel.create({username: jsonData.username, firstname: jsonData.firstname, lastname: jsonData.lastname,
                                        email: jsonData.email, password: jsonData.password, phone: jsonData.phone,
                                        userstatus: jsonData.userstatus, role: 'admin'})
        return await userModel.create({username: jsonData.username, firstname: jsonData.firstname, lastname: jsonData.lastname,
                                      email: jsonData.email, password: jsonData.password, phone: jsonData.phone,
                                      userstatus: jsonData.userstatus, role: jsonData.role})
       }))
       return 
    }
  }
  async isMigrationBefore(schema) {
    const migation = await this.migrationModel.find({})
    return await this.migrationModel.findOne({collectionname: schema})
                                  .then(data => {
                                    if(data) return true
                                    return false
                                  })
  }
  async run(migrationmethod: string){
    console.log("--------------------------------")
    console.log(process.env["DB"])
    console.log("--------------------------------")
    const schemas = []
    const getAllfileName = fs.readdirSync(__dirname + '/sampledb').forEach((file) => {
        schemas.push(file.split(".")[0])
    })
    if(migrationmethod !== 'all') {
      const isMigrate = await this.isMigrationBefore(migrationmethod)
      console.log(`=================== Start migrate ${migrationmethod} =================== `)
      if(isMigrate ) {
        console.log(`=================== Collection ${migrationmethod} is migrate before =================== `)
        process.exit()
      return
      }
      await this.migrationCollection(migrationmethod)
      await (await this.migrationModel.create({collectionname: migrationmethod, status: 'done' })).save()
      console.log(`=================== End migrate ${migrationmethod} =================== `)
      process.exit()
      return
    }
    
    for(let i = 0; i < schemas.length ; i++) {
      console.log(`=================== Start migrate ${schemas[i]} =================== `)
      const isMigrate = await this.isMigrationBefore(schemas[i])
      if(isMigrate ) {
        console.log(`=================== Collection ${schemas[i]} is migrate before =================== `)
        continue;
      }
      await this.migrationCollection(schemas[i])
      await (await this.migrationModel.create({collectionname: schemas[i], status: 'done' })).save()
      console.log(`=================== End migrate ${schemas[i]} =================== `)
      
    }
    process.exit()
  }
}
