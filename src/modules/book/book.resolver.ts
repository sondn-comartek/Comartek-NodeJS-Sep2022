import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { createWriteStream } from "fs";
import { join } from "path";
import { BookService } from "./book.service";
import { CreateBookInput } from "./input/book.input";
import { Book } from "./model/book.model";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";
import { Roles } from "src/modules/auth/decorator/roles.decorator";
import { Role } from "src/modules/auth/role/role.enum";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Category } from "src/modules/category/model/category.model";
import { Loader } from 'nestjs-dataloader';

import * as DataLoader from 'dataloader';
import { FileUploadService } from "../fileupload/fileupload.service";
import { Types } from "mongoose";
import { IDataloaders } from "../dataloader/dataloader.interface";
@Resolver(of => Book)
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
        @InjectQueue('book') private bookQueue: Queue,
        private readonly fileUploadService: FileUploadService
    ) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(() => Book)
    async createBook(@Args('CreateBookInput') { name, categoryId, quanities, pages, img }: CreateBookInput) {
        const book = await this.bookService.createBook(name, categoryId, quanities, pages)
        const fileUpload = await this.fileUploadService.uploadImage(img, 'book', book, this.bookQueue)
        book.imgId = new Types.ObjectId(fileUpload.id)
        return await book.save()
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

    @ResolveField(() => Category, { name: 'category' })
    async getBookBorrowed(
        @Parent() book: Book,
        @Context() { loaders }: { loaders: IDataloaders },
    ) {

        const categoryId = book.Category.toString()
        return await loaders.categoryLoader.load(categoryId);
    }




}