import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Roles } from "src/modules/auth/decorator/roles.decorator";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";
import { Role } from "src/modules/auth/role/role.enum";
import { Category } from "./model/category.model";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { CreateCategoryInput } from "./input/category.input";
import { CategoryService } from "./category.service";
import { createWriteStream } from "fs";
import { join } from "path";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { FileUploadService } from "../fileupload/fileupload.service";
import { Types } from "mongoose";

@Resolver(of => Category)
export class CategoryResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly fileUploadService: FileUploadService,
        @InjectQueue('category') private readonly categoryQueue: Queue
    ) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation(() => Category)
    async createCategory(@Args('CreateCategoryInput') { img, name }: CreateCategoryInput) {

        const category = await this.categoryService.createCategory(name)
        const fileUpload = await this.fileUploadService.uploadImage(img, 'category', category, this.categoryQueue)
        category.imgId = new Types.ObjectId(fileUpload.id)
        return await category.save()
    }
}