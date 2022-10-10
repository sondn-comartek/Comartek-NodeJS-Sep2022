import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";

import { BookService } from "./book.service";
import { CreateBookInput } from "./input/book.input";
import { Book, ExcelFile } from "./model/book.model";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";
import { Roles } from "src/modules/auth/decorator/roles.decorator";
import { Role } from "src/modules/auth/role/role.enum";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Category } from "src/modules/category/model/category.model";
import { FileUploadService } from "../fileupload/fileupload.service";
import { Types } from "mongoose";
import { IDataloaders } from "../dataloader/dataloader.interface";
import { SubAuthGuard } from "../auth/guard/subauth.guard";
import { PubSub } from "graphql-subscriptions";
import { CurrentUser } from "../auth/decorator/currentuser.decorator";
@Resolver(of => Book)
export class BookResolver {
    private pubSub: PubSub
    constructor(
        private readonly bookService: BookService,
        @InjectQueue('book') private bookQueue: Queue,
        private readonly fileUploadService: FileUploadService
    ) {
        this.pubSub = new PubSub()
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(() => Book)
    async createBook(@Args('CreateBookInput') { name, categoryId, quanities, pages, img }: CreateBookInput) {
        const book = await this.bookService.createBook(name, categoryId, quanities, pages)
        const fileUpload = await this.fileUploadService.uploadImage(img, 'book', book, this.bookQueue)
        book.imgId = new Types.ObjectId(fileUpload.id)
        await book.save()
        this.pubSub.publish('notifyUserNewBook', { notifyUserNewBook: book });

        return book
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Book)
    async findBook(@Args('name') name: string) {
        return await this.bookService.findBookByCond(name)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Book])
    async findBooks(@Args('page') page: number) {
        return await this.bookService.findBooks(page)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Query(() => Boolean)
    async exportFileExcel(@CurrentUser() user: any) {
        try {
            await this.bookQueue.add('exportExcel', {
                userId: user.id
            })
            this.pubSub.publish('notifyExportFileExel', { notifyExportFileExel: this.bookService.returnExcelPath(user.id) });
            return true
        } catch (err) {
            console.log(err)
        }
    }


    @UseGuards(SubAuthGuard, RolesGuard)
    @Roles(Role.Member)
    @Subscription(() => Book)
    notifyUserNewBook(@Args('userRole') userRole: string) {
        return this.pubSub.asyncIterator('notifyUserNewBook');
    }

    @UseGuards(SubAuthGuard, RolesGuard)
    @Subscription(returns => ExcelFile, ({
        filter: (payload, variables) =>
            payload.notifyExportFileExel.userId === variables.userId,
    }))
    notifyExportFileExel(@Args('userId') useId: string) {
        return this.pubSub.asyncIterator('notifyExportFileExel');
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