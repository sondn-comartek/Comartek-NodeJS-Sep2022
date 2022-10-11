import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookBorrowed } from '../exception/bookBorrowed';
import { BookNotExist } from '../exception/booknotexist';
import { OrderService } from '../order/order.service';
import { BookDocument } from './model/book.schema';
import * as dayjs from 'dayjs'
@Injectable()
export class BookService {
  constructor (@InjectModel('book') private bookModel: Model<BookDocument>,
               private readonly orderService: OrderService) {}
  hello() {
    return "hello"
  }
  public async requireBorrowBook(userid: String, BookID: string) {
    const orderModel = this.orderService.getOrderModel();
    const book = await this.bookModel.findOne({_id: BookID})
    if(!book) {
      throw new BookNotExist();
    }
    if(book.borrowed)
      throw new Error("Book is borrowed")
    const order = await (await orderModel.create({userid: userid, bookid: BookID})).save()
    await this.convertOrderCreateAtToNumber(order)
    return order
  }
  public async convertOrderCreateAtToNumber(order: any) {
    const newValueDate = String(dayjs(new Date().toString()).valueOf() / 1000)
    order.createdAt = newValueDate
    await this.orderService.getOrderModel()
    .updateOne({_id: order.id}, {$set: {createdAt: newValueDate}})
    return
  }
  public async accepBorrowBook(orderID: String) {
    let order = await this.orderService.getOrderModel().findOne({_id: orderID})

    if(!order)
      throw new Error("order not exist")
     await this.orderService.getOrderModel().updateOne({_id: orderID}, {$set: {status: "accept"}})
    await this.borrowBook(order.userid, order.bookid)
    return await this.orderService.getOrderModel().findOne({_id: orderID})
  } 

  public async rejectBorrowBook(orderID: String) {
    const order = await this.orderService.getOrderModel().findOne({_id: orderID})

    if(!order)
      throw new Error("order not exist")
    await this.orderService.getOrderModel().updateOne({_id: orderID}, {$set: {status: "reject"}})
    return await this.orderService.getOrderModel().findOne({_id: orderID})
  } 

  public async borrowBook(userid: String, bookID: string) {
    const book =  await this.bookModel.findOne({_id: bookID});
    if(!book) {
      throw new BookNotExist();
    }
    if(book.borrowed)
      throw new Error("Book is borrowed")
    await this.bookModel.updateOne({_id: bookID}, {$set: {borrowed: true, userborrow: userid}})
  }

  getBookModel() {
    return this.bookModel;
  }

  
}
