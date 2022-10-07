import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, Positional } from 'nestjs-command';
import * as requireDir from 'require-dir';
import { BooksService } from 'src/modules/books/services/books.service';
import { BookDocument } from 'src/modules/books/entities/book.entity';
import { CategoriesService } from 'src/modules/categories/services/categories.service';
import { CategoryDocument } from 'src/modules/categories/entities/category.entity';
import { UserDocument } from 'src/modules/users/entities/user.entity';
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
    readonly userModel: Model<UserDocument>,
    @InjectModel('Book')
    readonly bookModel: Model<BookDocument>,
    @InjectModel('Category')
    readonly categoryModel: Model<CategoryDocument>,
  ) {}

  run = async (migrationName?: string) => {
    console.log(
      '!!!!!!!!!!!!!!!!!!!!!!!!! STARTED MIGRATE !!!!!!!!!!!!!!!!!!!!!!!!!',
    );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const modules = require('require-dir-all')('./');
    const modules: Migrations = requireDir('./steps');
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
    describe: 'migrate database',
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
    describe: 'migrate database',
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
