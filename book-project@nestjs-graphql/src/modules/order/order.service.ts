import { BadRequestException, Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { BookRepository } from '../book/book.repository'
import { UserRepository } from '../user/user.repository'
import { ApproveOrderInput, CreateOrderInput } from './dto'
import { OrderDocument } from './models'
import { OrderRepository } from './order.repository'
import { OrderStatus } from './types'
@Injectable()
export class OrderService {
   constructor(
      private readonly orderRepository: OrderRepository,
      private readonly bookRepository: BookRepository,
      private readonly userRepository: UserRepository,
   ) {}

   async findOrdersByCustomerId(userid: string) {
      return await this.orderRepository.FindAll({
         customer: userid,
      })
   }

   async countBooksOfCustomerByStatus(
      userid: string,
      status: OrderStatus,
   ):Promise<Number> {
      const orders = await this.orderRepository.FindAll({
         customer: userid,
         status: status,
      })
      return orders.reduce((pre, cur) => {
         return pre + cur.books.length
      }, 0)
   }

   async create(createOrderInput: CreateOrderInput): Promise<OrderDocument> {
      const user = await this.userRepository.FindOne({
         userid: createOrderInput.customer,
      })
      if (!user) throw new BadRequestException('The customer is undefined!')
      const books = await this.bookRepository.FindAll({
         bookid: {
            $in: createOrderInput.books,
         },
      })
      if (books.length < createOrderInput.books.length)
         throw new BadRequestException(`Not found the book to rent!`)
      books.forEach((book) => {
         if (!book || book.count_avaiable === 0)
            throw new BadRequestException(
               `The book '${book?.title}' is unavaiable !`,
            )
      })
      await this.bookRepository.UpdateMany(
         {
            bookid: {
               $in: createOrderInput.books,
            },
         },
         {
            $inc: {
               count_avaiable: -1,
               count_unavaiable: 1,
            },
         },
         {
            new: true,
         },
      )
      return await this.orderRepository.Create({
         orderid: v4(),
         books: createOrderInput.books,
         customer: createOrderInput.customer,
      })
   }
   async approve({
      orderid,
      status,
   }: ApproveOrderInput): Promise<OrderStatus | Record<string, unknown>> {
      const order = await this.orderRepository.FindOne({
         orderid: orderid,
      })
      if (!order || order.status !== OrderStatus.PENDING)
         throw new BadRequestException(
            `Can not approve order is ${order?.status}`,
         )
      if (status === OrderStatus.ACCEPCTED) {
         await this.orderRepository.FindOneAndUpdate(
            {
               orderid: orderid,
            },
            {
               status: status,
            },
            {
               new: true,
            },
         )
         return status
      }
      if (status === OrderStatus.REJECTED) {
         const order = await this.orderRepository.FindOneAndUpdate(
            {
               orderid: orderid,
            },
            {
               status: status,
            },
            {
               new: true,
            },
         )
         await this.bookRepository.UpdateMany(
            {
               bookid: {
                  $in: order.books,
               },
            },
            {
               $inc: {
                  count_avaiable: 1,
                  count_unavaiable: -1,
               },
            },
            {
               new: true,
            },
         )
         return status
      }
   }
}
