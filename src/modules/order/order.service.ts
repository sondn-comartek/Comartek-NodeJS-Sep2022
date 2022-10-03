import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { BookService } from "src/modules/book/book.service";
import { UserService } from "src/modules/user/user.service";
import { Order } from "./model/order.model";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) { }

    async createOrder(userId: string, bookId: string, dateBorrow: string, dateReturn: string) {
        let UserId = new Types.ObjectId(userId)
        let BookId = new Types.ObjectId(bookId)
        const newOrder = await this.orderModel.create({
            User: UserId,
            Book: BookId,
            dateBorrow,
            dateReturn
        })
        return newOrder.populate([
            {

                path: 'User',
            },
            {
                path: 'Book',

                populate: {
                    path: 'Category',
                },
            },

        ])


    }

    async updateOrder(orderId: string, status: string) {
        const currentOrder = await this.orderModel.findById(orderId)
        if (status === 'denied') {
            currentOrder.status = 'denied'
            await currentOrder.save()
            return currentOrder.populate([
                {

                    path: 'User',
                },
                {
                    path: 'Book',

                    populate: {
                        path: 'Category',
                    },
                },

            ])
        }
        if (status === 'accepted') {
            const bookId = currentOrder.Book.toString()
            const userId = currentOrder.User.toString()

            const [currentBook, currentUser] = await Promise.all([this.bookService.findBookById(bookId), this.userService.findUserById(userId)])

            if (currentBook.quanities === currentBook.borrowed) {
                currentOrder.status === 'denied'
                await currentOrder.save()
                throw new BadRequestException('This book is not enough')
            }
            currentBook.borrowed++;
            const bookObjId = new Types.ObjectId(bookId)
            currentUser.ListBooksBorrow.push(bookObjId)
            currentOrder.status = 'accepted'


            await Promise.all([currentBook.save(), currentUser.save(), currentOrder.save()])

            return currentOrder.populate([
                {

                    path: 'User',
                },
                {
                    path: 'Book',

                    populate: {
                        path: 'Category',
                    },
                },

            ])
        }
    }
    async findOrderByIds(ids: readonly string[]) {
        const orders = await this.orderModel.find({ _id: { $in: ids } })
        const mappedOrders = ids.map(
            (id) =>
                orders.find((order) => order.id === id) ||
                new Error(`Could not load order ${id}`),
        );
        // console.log('mappedUsers', mappedUsers);
        return mappedOrders;
    }

}