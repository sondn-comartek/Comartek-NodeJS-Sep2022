import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BookRepository } from '../book/book.repository';
import { BookStatus } from '../book/types';
import { UserRepository } from '../user/user.repository';
import { CreateOrderInput } from './dto';
import { OrderDocument } from './models';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor( 
        private readonly orderRepository: OrderRepository ,
        private readonly bookRepository: BookRepository ,
        private readonly userRepository: UserRepository
        ){}
    async create(createOrderInput: CreateOrderInput):Promise<OrderDocument>{
        const books = await Promise.all(
            createOrderInput.books.map( (bookid) => {
            return this.bookRepository.FindOne({
                bookid : bookid
            } , 'bookid name status -_id' , { lean : true } )
        }))
        books.forEach( book => {
            if( !book || book.status === BookStatus.UNAVAIABLE || book.status === BookStatus.PENDING)
            throw new BadRequestException(`The book '${book?.name}' is ${book?.status}!`)
        })
        await Promise.all(
            createOrderInput.books.map( (bookid) => {
            return this.bookRepository.FindOneAndUpdate({
                bookid : bookid
            }, { status : BookStatus.PENDING } , { new : true } )
        }))
        const user = await this.userRepository.FindOne({
            userid : createOrderInput.customer
        })
        if(!user) throw new BadRequestException('The customer is undefined!')
         return await this.orderRepository.Create({
            orderid : v4() ,
            books : createOrderInput.books ,
            customer : createOrderInput.customer
        });
    }
}
