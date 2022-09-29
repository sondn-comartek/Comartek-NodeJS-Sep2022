import { BadRequestException, Injectable } from '@nestjs/common';
import { use } from 'passport';
import { BookRepository } from '../book/book.repository';
import { BookStatus } from '../book/types';
import { OrderRepository } from '../order/order.repository';
import { OrderStatus } from '../order/types';
import { ApproveOrderInput, FilterUser } from './dto';
import { UserDocument } from './models';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly orderRepository: OrderRepository,
        private readonly bookRepository: BookRepository
    ) { }
    async findOne(filter: FilterUser): Promise<UserDocument> {
        const user = Object.keys(filter).length > 0 && await this.userRepository.FindOne(
            filter,
            '-_id -hash',
            { lean: true })
        if (!user) throw new BadRequestException('Not found user!')
        return user;
    }
    async approveOrder({ orderid, status }: ApproveOrderInput): Promise<OrderStatus | Record<string, unknown>> {
        const order = await this.orderRepository.FindOne({
            orderid: orderid
        }, 'status -_id', { lean: true })
        if (!order ||
            order.status === OrderStatus.ACCEPCTED ||
            order.status === OrderStatus.REJECTED)
            throw new BadRequestException(`Can not approve order is ${order?.status}`)
        
        if (status === OrderStatus.ACCEPCTED) {
            const order = await this.orderRepository.FindOneAndUpdate({
                orderid: orderid
            }, { status: status }, { new: true })
            await Promise.all(
                order.books.map(bookid => {
                    return this.bookRepository.FindOneAndUpdate({
                        bookid: bookid
                    }, { status: BookStatus.UNAVAIABLE }, { new: true })
                })
            )
            const user = await this.userRepository.FindOne({
                userid : order.customer
            } , 'books userid -_id' , { lean : true })
            user?.books.push(...order.books)
            await this.userRepository.FindOneAndUpdate(
                { userid : user.userid } , { books: user.books })
            return status
        }
        if (status === OrderStatus.REJECTED) {
            const order = await this.orderRepository.FindOneAndUpdate({
                orderid: orderid
            }, { status: status }, { new: true })
            await Promise.all(
                order.books.map(bookid => {
                    return this.bookRepository.FindOneAndUpdate({
                        bookid: bookid
                    }, { status: BookStatus.AVAIABLE }, { new: true })
                })
            )
            return status;
        }
        return status;
    }
}
