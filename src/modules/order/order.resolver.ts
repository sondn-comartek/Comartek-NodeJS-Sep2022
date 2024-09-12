
import { Order } from "./model/order.model";
import { OrderService } from "./order.service";
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";
import { Roles } from "src/modules/auth/decorator/roles.decorator";
import { Role } from "src/modules/auth/role/role.enum";
import { Book } from "src/modules/book/model/book.model";
import { IDataloaders } from "../dataloader/dataloader.interface";
import { CreateOrderRequestInput, UpdateOrderRequestInput } from "../user/input/user.input";
import { UseGuards, Inject } from '@nestjs/common';
import { User } from "../user/model/user.model";
import { CurrentUser } from "../auth/decorator/currentuser.decorator";

import { ClientProxy } from "@nestjs/microservices";
import { UserService } from "../user/user.service";
import { BookService } from "../book/book.service";
import { SubAuthGuard } from "../auth/guard/subauth.guard";


@Resolver(() => Order)
export class OrderResolver {
    private pubSub: PubSub
    constructor(
        private readonly orderService: OrderService,
        @Inject('NOTIFY_SERVICE') private readonly client: ClientProxy,
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) {
        this.pubSub = new PubSub()
    }
    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async updateRequest(@Args('UpdateOrderRequestInput') { orderId, status }: UpdateOrderRequestInput) {

        const currentOrder = await this.orderService.updateOrder(orderId, status)
        const [currenstUser, bookRequest] = await Promise.all([this.userService.findUserById(currentOrder.User.toString()), this.bookService.findBookById(currentOrder.Book.toString())])
        if (status === 'denied') {
            this.client.emit('msg', {
                message: `You can not borrow ${bookRequest.name} `
            })
        }

        if (status === 'done') {
            this.client.emit('msg', {
                message: `${currenstUser.username} have already returned ${bookRequest.name} `
            })
        }
        this.pubSub.publish('notifyUserReqStatus', { notifyUserReqStatus: currentOrder });
        return currentOrder
    }

    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    async sendRequestBorrowBook(@Args('CreateOrderRequestInput') createOrderRequestInput: CreateOrderRequestInput, @CurrentUser() user: any,
    ) {

        const { bookId, dateBorrow, dateReturn } = createOrderRequestInput
        const { id, role } = user
        // const [currenstUser, bookRequest] = await Promise.all([this.userService.findUserById(id), this.bookService.findBookById(bookId)])
        // if (bookRequest.quanities === bookRequest.borrowed) {
        //     this.client.emit('msg', {
        //         message: ` ${bookRequest.name} is not enough`
        //     })
        // }
        // this.client.emit('msg', {
        //     currenstUser,
        //     bookRequest,
        //     message: `${currenstUser.username} want to borrow ${bookRequest.name}`
        // })
        const newOrder = await this.orderService.createOrder(id, bookId, dateBorrow, dateReturn)
        this.pubSub.publish('notifyAdminUserSendReq', { notifyAdminUserSendReq: newOrder });
        return newOrder
    }

    @Subscription(() => Order)
    @UseGuards(SubAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    notifyAdminUserSendReq() {
        return this.pubSub.asyncIterator('notifyAdminUserSendReq');
    }


    @UseGuards(SubAuthGuard, RolesGuard)
    @Roles(Role.User)
    @Subscription(() => Order, {
        filter(payload, variables) {
            const userId = payload.notifyUserReqStatus.User.toString()
            return userId === variables.userId
        }
    })
    notifyUserReqStatus(@Args('userId') userId: string) {
        return this.pubSub.asyncIterator('notifyUserReqStatus');
    }

    @ResolveField(() => Book, { name: 'Book' })
    async getBook(
        @Parent() order: Order,
        @Context() { loaders }: { loaders: IDataloaders },
    ) {

        const bookId = order.Book.toString()
        return await loaders.bookLoader.load(bookId);
    }

    @ResolveField(() => User, { name: 'User' })
    async getUser(
        @Parent() order: Order,
        @Context() { loaders }: { loaders: IDataloaders },
    ) {

        const userId = order.User.toString()
        return await loaders.userLoader.load(userId);
    }
}