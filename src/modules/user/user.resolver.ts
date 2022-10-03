import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/modules/auth/auth.service";
import { JWT } from "src/modules/auth/model/jwt.model";
import { CreateOrderRequestInput, UpdateOrderRequestInput, UserLoginInput, UserSignupInput } from "./input/user.input";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Order } from "src/modules/order/model/order.model";
import { OrderService } from "src/modules/order/order.service";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";
import { Roles } from "src/modules/auth/decorator/roles.decorator";
import { Role } from "src/modules/auth/role/role.enum";
import { CurrentUser } from "src/modules/auth/decorator/currentuser.decorator";
import { Book } from "src/modules/book/model/book.model";
import * as DataLoader from 'dataloader';
import { IDataloaders } from "../dataloader/dataloader.interface";
import { Category } from "../category/model/category.model";
@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly orderService: OrderService
    ) { }

    @Mutation(() => JWT)
    async signup(@Args('SignupInput') signupInput: UserSignupInput) {
        const user = await this.userService.signup(signupInput)
        return this.authService.getToken(user)
    }

    @Mutation(() => JWT)
    async login(@Args('LoginUserInput') loginInput: UserLoginInput) {
        const user = await this.userService.login(loginInput)
        if (!user) {
            throw new BadRequestException('Invalid gmail or password')
        }
        return this.authService.getToken(user)
    }
    @Query(() => Boolean)
    async hello() {
        return true
    }

    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    async sendRequestBorrowBook(@Args('CreateOrderRequestInput') createOrderRequestInput: CreateOrderRequestInput, @CurrentUser() user: any) {
        const { bookId, dateBorrow, dateReturn } = createOrderRequestInput
        const { id, role } = user
        return await this.orderService.createOrder(id, bookId, dateBorrow, dateReturn)
    }

    @Mutation(() => Order)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async updateRequest(@Args('UpdateOrderRequestInput') { orderId, status }: UpdateOrderRequestInput) {
        return await this.orderService.updateOrder(orderId, status)
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getUser(@Args('userId') userId: string) {
        const user = await this.userService.findUserById(userId)

        return await user.populate([
            {
                path: 'ListBooksBorrow',

                populate: {
                    path: 'Category',
                },
            },

        ])
    }

    @Query(() => [User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getUsers() {
        const users = await this.userService.findUsers()
        return users
    }

    @ResolveField('listBooksBorrow', () => [Book])
    async getListBooksBorrow(
        @Parent() user: User,
        @Context() { loaders }: { loaders: IDataloaders },
    ) {

        const listBooksId = user.ListBooksBorrow.map((bookId) => bookId.toString())
        console.log(listBooksId)
        return await loaders.bookLoader.loadMany(listBooksId);
    }

    @ResolveField(() => Category, { name: 'category' })
    async getBookBorrowed(
        @Parent() book: Book,
        @Context() { loaders }: { loaders: IDataloaders },
    ) {

        const categoryId = book.Category.toString()
        return await loaders.categoryLoader.load(categoryId);
    }
}