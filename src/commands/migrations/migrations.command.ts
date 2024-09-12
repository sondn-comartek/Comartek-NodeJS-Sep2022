import { Migration as MigrationInterface } from "./migrations.interface";
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/user/model/user.model";
import { Book } from "src/modules/book/model/book.model";
import { Category } from "src/modules/category/model/category.model";
import { Order } from "src/modules/order/model/order.model";
import { Command, Positional } from 'nestjs-command';

import { dbinit, dbinitAll } from "../dbinit";


@Injectable()
export class Migration {
    constructor(
        @InjectModel('Migration')
        readonly migrationModel: Model<MigrationInterface>,
        @InjectModel(User.name)
        readonly UserModel: Model<User>,
        @InjectModel(Book.name)
        readonly BookModel: Model<Book>,
        @InjectModel(Category.name)
        readonly CategoryModel: Model<Category>,
        @InjectModel(Order.name)
        readonly OrderModel: Model<Order>
    ) { }


    @Command({
        command: 'database:migrate:one <migrationName>',
        describe: 'migrate database'
    })
    async migrateOne(
        @Positional({
            name: 'migrationName',
            describe: 'name of specific migratioan to run',
            type: 'string',
        })
        migrationName?: string,
    ) {
        if (migrationName === 'admin') {
            const Admin = dbinit.user.find((el) => el.admin)
            await this.UserModel.create(Object.values(Admin)[0])
        }
        if (migrationName === 'user') {
            const user = dbinit.user.find((el) => el.user)
            await this.UserModel.create(Object.values(user)[0])
        }
        if (migrationName === 'member') {
            const member = dbinit.user.find((el) => el.member)
            await this.UserModel.create(Object.values(member)[0])
        }
        if (migrationName === 'book') {
            await this.BookModel.create(dbinit.book)
        }
    }

    @Command({
        command: 'database:migrate:all',
        describe: 'migrate database',
    })
    async migrateAll() {
        await Promise.all([this.UserModel.create(dbinitAll.user), this.BookModel.insertMany(dbinitAll.books)])
    }
}


