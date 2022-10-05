import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, Positional } from 'nestjs-command';
import * as requireDir from 'require-dir';
import { Book } from 'src/module/books/entities/book.entity';
import { Category } from 'src/module/categories/entities/category.entity';
import { Image } from 'src/module/images/entities/image.entity';
import { Notification } from 'src/module/notification/entities/notification.entity';
import { RentBook } from 'src/module/rent/entities/rent.entity';
import { User } from 'src/module/users/entities/user.entity';

import Commands from '../base';
import { Migration as MigrationInterface } from './migrations.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface MigrationStep {
  name: string;
  up(migration: Migration): Promise<any>;
}

interface Migrations {
  [key: string]: MigrationStep;
}

@Injectable()
export class Migration {
  constructor(
    @InjectModel('Migration')
    readonly migrationModel: Model<MigrationInterface>,
    @InjectModel('User')
    readonly userModel: Model<User>,
    @InjectModel(Book.name)
    readonly bookModel: Model<Book>,
    @InjectModel(RentBook.name)
    readonly rentBookModel: Model<RentBook>,
    @InjectModel(Category.name)
    readonly categoryModel: Model<Category>,
    @InjectModel(Notification.name)
    readonly notificationModel: Model<Notification>,
    @InjectModel(Image.name)
    readonly imageModel: Model<Image>,
  ) { }

  run = async (migrationName?: string) => {
    console.log(
      '!!!!!!!!!!!!!!!!!!!!!!!!! STARTED MIGRATE !!!!!!!!!!!!!!!!!!!!!!!!!',
    );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const modules = require('require-dir-all')('./');
    const modules: Migrations = requireDir('./steps');
    console.log("modules: ", modules)
    const keys = [];
    for (const key in modules) {
      if (modules.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    // check script need to run
    let ranKeys = [];
    ranKeys = await this.migrationModel
      .find({
        key: {
          $in: keys,
        },
      })
      .distinct('key');

    const needToRunKeys = migrationName
      ? [migrationName]
      : keys.filter((k) => ranKeys.indexOf(k) === -1);
      
    if (migrationName && !modules[migrationName]) {
      console.log('Migration key not exist');
      return;
    }

    for (const key of needToRunKeys) {
      console.log(`MIGRATE ${modules[key].name}: ${key} STARTED`);
      await modules[key].up(this);
      if (key !== '0-before-all') {
        await this.migrationModel.create({
          key,
          createdAt: new Date(),
        });
      }
      console.log(`MIGRATE ${modules[key].name}: ${key} COMPLETED`);
    }

    console.log(
      '!!!!!!!!!!!!!!!!!!!!!!!!! MIGRATE DONE !!!!!!!!!!!!!!!!!!!!!!!!!',
    );
  };

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
    Commands.run(() => {
      this.run(migrationName)
        .then(() => {
          process.exit(0);
        })
        .catch((error) => {
          console.error(error);
          console.error(
            '!!!!!!!!!!!!!!!!!!!!!!!!! MIGRATE DONE WITH ERROR !!!!!!!!!!!!!!!!!!!!!!!!!',
          );
          process.exit(0);
        });
    });
  }

  @Command({
    command: 'database:migrate:all',
    describe: 'migrate database'
  })
  async migrateAll() {
    Commands.run(() => {
      this.run()
        .then(() => {
          process.exit(0);
        })
        .catch((error) => {
          console.error(error);
          console.error(
            '!!!!!!!!!!!!!!!!!!!!!!!!! MIGRATE DONE WITH ERROR !!!!!!!!!!!!!!!!!!!!!!!!!',
          );
          process.exit(0);
        });
    });
  }
}
